import numpy as np
import cv2
from flask import Response


# Generate an STI in the manner specified by mode
def generateSTI(videoPath, mode):
    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video, mode), mimetype='multipart/x-mixed-replace; boundary=frame')


# Read the video frame-by-frame to generate an STI
def readFrames(video, mode):
    ret, oldFrame = video.read()
    if not ret: raise Exception("Failed to read video")

    # Resize normalize such that values exist in [0,1]
    oldFrame = cv2.resize(oldFrame, (32, 32))
    oldFrame = oldFrame / 255

    STI = np.zeros((32, 1))

    while(video.isOpened()):
        ret, newFrame = video.read()
        if(ret is False):
            break  # End of video

        # Resize and normalize such that values exist in [0,1]
        newFrame = cv2.resize(newFrame, (32, 32))
        newFrame = newFrame / 255
        
        # Generate the STI column
        if (mode == "row"):
            col = generateSTIColumnByRow(newFrame, oldFrame)
        elif(mode == "col"):
            col = generateSTIColumnByCol(newFrame, oldFrame)
        STI = np.c_[STI, col]
        oldFrame = newFrame
        
        # encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", STI[:, 1:]*255)

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
              bytearray(encodedImage) + b'\r\n')


# Compares new and old frame column-by-bolumn to generate an STI column
def generateSTIColumnByCol(newFrame, oldFrame):
    STIcol = np.zeros((32, 1))
    for j in range(32):
        Hold = makeLuminenceHistogram(oldFrame[:, j])
        Hnew = makeLuminenceHistogram(newFrame[:, j])
        STIcol[j-1, :] = histogramIntersection(Hold, Hnew)
    return STIcol


# Compares new and old frame column-by-bolumn to generate an STI column
def generateSTIColumnByRow(newFrame, oldFrame):
    STIcol = np.zeros((32, 1))
    for i in range(32):
        Hold = makeLuminenceHistogram(oldFrame[i, :])
        Hnew = makeLuminenceHistogram(newFrame[i, :])
        STIcol[i-1, :] = histogramIntersection(Hold, Hnew)
    return STIcol


# Create a 2D luminence histogram from a frame vector
def makeLuminenceHistogram(vector):
    r = []  # Make an array of r values
    g = []  # Make an array of g values

    # Iterate through the vector and gather all r,g values
    for i in range(32):
        chromaticity = RGBtoChromaticity(vector[i])
        r.append(chromaticity[0, 0])  # r value
        g.append(chromaticity[0, 1])  # g value

    # Create a luminensce histogram with 8*8 = 64 bins
    hist = np.histogram2d(r, g, bins=10, range=[[0, 1], [0, 1]], density=1)
    return hist[0]


# Returns a scalar I based on histogram difference
# Assumes Hold and Hnew are 10 x 10 Chromaticity Histograms
def histogramIntersection(Hold, Hnew):
    I = 0
    for i in range(10):
        for j in range(10):
            I += (min(Hold[i, j], Hnew[i, j])) / 100  # Normalize values
    return I


# Returns (r,g) from (R, G, B)
def RGBtoChromaticity(pixel):
    sumRGB = sum(pixel) + (1/255)  # Add one to account for black (0, 0, 0)
    chromaticity = np.zeros((1, 2))
    chromaticity[0, 0] = pixel[0] / sumRGB  # r value
    chromaticity[0, 1] = pixel[1] / sumRGB  # g value
    return chromaticity