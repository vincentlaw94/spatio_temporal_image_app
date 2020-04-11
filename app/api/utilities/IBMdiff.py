import numpy as np
from numpy.linalg import norm  # For L2 norm
import cv2
import math  # For math.sqrt()
from flask import Response


# Generate an STI in the manner specified by mode
def generateSTI(videoPath, mode, threshold):
    video = cv2.VideoCapture(videoPath)
    threshold = int(threshold)/255
    return Response(readFrames(video, mode, threshold), mimetype='multipart/x-mixed-replace; boundary=frame')


# Read the video frame-by-frame to generate an STI
def readFrames(video, mode, threshold):
    ret, oldFrame = video.read()
    if not ret: raise Exception("Failed to read video")

    # Resize and normalize such that values exist in [0,1]
    oldFrame = cv2.resize(oldFrame, (64, 64))
    oldFrame = oldFrame / 255

    STI = np.zeros((64, 1))

    # Iterate over all frames in the video and generate an STI
    while(video.isOpened()):
        ret, newFrame = video.read()
        if(ret is False):
            break  # End of video

        # Resize and normalize such that values exist in [0,1]
        newFrame = cv2.resize(newFrame, (64, 64))
        newFrame = newFrame / 255 
        
        # Generate the STI column
        col = generateSTIColumn(newFrame, oldFrame, mode, threshold)
        STI = np.c_[STI, col]
        oldFrame = newFrame

        # encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", STI[:, 1:]*255)

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
              bytearray(encodedImage) + b'\r\n')


# Uses the IBM method from the project outline to generate an STI column
# Frame needs to be resized to a number that is a perfect square and cube
def generateSTIColumn(newFrame, oldFrame, mode, threshold):
    STIcol = np.zeros((64,1))

    # Generate nearness matrix
    A = makeNearnessMatrix(newFrame, oldFrame, mode) 

    # If moving column by column
    if (mode == "colRGB" or mode == "colChr"):
        for j in range(64):
            z  = makeZ(newFrame[:,j], oldFrame[:,j], mode)
            zt = np.transpose(z)
            Az = np.matmul(A, z)
            STIcol[j-1, :] = np.matmul(zt, Az)
            if(STIcol[j-1, :] < threshold): STIcol[j-1, :] = 0
            else:                           STIcol[j-1, :] = 1

    # If moving row by row
    elif (mode == "rowRGB" or mode == "rowChr"):
        for i in range(64):
            z  = makeZ(newFrame[i,:], oldFrame[i,:], mode)
            zt = np.transpose(z)
            Az = np.matmul(A, z)
            STIcol[i-1, :] = np.matmul(zt, Az)
            if(STIcol[i-1, :] < threshold): STIcol[i-1, :] = 0
            else:                           STIcol[i-1, :] = 1

    return STIcol


# Generate the nearness matrix A using L2 norm (i.e. Euclidian Distance Norm)
def makeNearnessMatrix(newFrame, oldFrame, mode):
    A = np.zeros((64,64))

    # If mode is RGB, make A using the L2 norm of RGB values
    if (mode == "rowRGB" or mode == "colRGB"):
        dmax = math.sqrt(3)
        for i in range(64):
            for j in range(64):
                A[i,j] = 1 - (norm(newFrame[i,j] - oldFrame[i,j]) / dmax)

    # If mode is Chromaticity, make A using the L2 norm of Luminensce values 
    elif (mode == "rowChr" or mode == "colChr"):
        dmax = math.sqrt(2)
        for i in range(64):
            for j in range(64):
                oldChromaticity = RGBtoChromaticity(oldFrame[i,j])
                newChromaticity = RGBtoChromaticity(newFrame[i,j])
                A[i,j] = 1 - (norm(newChromaticity - oldChromaticity) / dmax)
    return A


# Generate the histogram difference column z
def makeZ(newCol, oldCol, mode):
    z = np.ones((64,1))

    # Using RGB Values
    if (mode == "rowRGB" or mode == "colRGB"):
        Hold = makeColorHistogram(oldCol)
        Hnew = makeColorHistogram(newCol)

    # Using Luminensce Values
    elif (mode == "rowChr" or mode == "colChr"):
        Hold = makeLuminenceHistogram(oldCol)
        Hnew = makeLuminenceHistogram(newCol)

    # Normalize values to be in range [0 1] 
    Hdiff = abs(Hnew - Hold) / 64  

    # Flatten histogram
    z[:,0] = np.matrix.flatten(Hdiff) 
    return z


# Make a 4x4x4 histogram of RGB values (64 total bins)
def makeColorHistogram(vector):
    hist = np.histogramdd(vector, bins=(4,4,4), density=1)
    return hist[0]


# Create a 2D luminence histogram from a frame vector (64 total bins)
def makeLuminenceHistogram(vector):
    r = []  # Make an array of r values
    g = []  # Make an array of g values

    # Iterate through the vector and gather all r,g values
    for i in range(32):
        chromaticity = RGBtoChromaticity(vector[i])
        r.append(chromaticity[0, 0])
        g.append(chromaticity[0, 1])

    # Create a luminensce histogram with 8*8 = 64 bins
    hist = np.histogram2d(r, g, bins=8, range=[[0, 1], [0, 1]], density=1)
    return hist[0]


# Returns (r,g) from (R, G, B)
def RGBtoChromaticity(pixel):
    sumRGB = sum(pixel) + (1/255)  # Add one to account for black (0, 0, 0)
    chromaticity = np.zeros((1, 2))
    chromaticity[0, 0] = pixel[0] / sumRGB  # r value
    chromaticity[0, 1] = pixel[1] / sumRGB  # g value
    return chromaticity