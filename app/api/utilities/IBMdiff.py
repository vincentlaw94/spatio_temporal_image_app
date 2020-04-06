import numpy as np
from numpy.linalg import norm #For l2 norm
import cv2
import math
from flask import Response


# Generate and Save a Spatio-Temportal Image (STI) by Row using {R,G,B} L2 Norm
def generateByRowRGB(videoPath):
    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video, "rowRGB"), mimetype='multipart/x-mixed-replace; boundary=frame')


# Generate and Save a Spatio-Temportal Image (STI) by Col using {R,G,B} L2 Norm
def generateByColRGB(videoPath):
    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video, "colRGB"), mimetype='multipart/x-mixed-replace; boundary=frame')


# Generate and Save a Spatio-Temportal Image (STI) by Row  using {r,g} L2 Norm
def generateByRowChr(videoPath):
    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video, "rowChr"), mimetype='multipart/x-mixed-replace; boundary=frame')


# Generate and Save a Spatio-Temportal Image (STI) by Col  using {r,g} L2 Norm
def generateByColChr(videoPath):
    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video, "colChr"), mimetype='multipart/x-mixed-replace; boundary=frame')


# Read the video frame-by-frame to generate an STI
def readFrames(video, mode):
    ret, oldFrame = video.read()
    if not ret:
        raise Exception("Failed to read video")
    STI = np.zeros((64, 1))

    while(video.isOpened()):
        ret, frame = video.read()
        if(ret is False):
            break  # End of video

        # Generate the STI row by row or col by col
        if (mode == "rowRGB"):
            col = generateSTIColumnByRow(frame, oldFrame, "RGB")
        elif (mode == "colRGB"):
            col = generateSTIColumnByCol(frame, oldFrame, "RGB")
        elif (mode == "rowChr"):
            col = generateSTIColumnByRow(frame, oldFrame, "Chromaticity")
        elif (mode == "colChr"):
            col = generateSTIColumnByCol(frame, oldFrame, "Chromaticity")

        STI = np.c_[STI, col]
        oldFrame = frame

        # encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", STI[:, 1:]*255)

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
              bytearray(encodedImage) + b'\r\n')


# Uses the IBM method from the project outline to generate an STI column
# Frame needs to be resized to a number that is a perfect square and cube
def generateSTIColumnByCol(newFrame, oldFrame, mode):
    newFrame = cv2.resize(newFrame, (64, 64))  # Resize to 64 cols x 64 rows
    oldFrame = cv2.resize(oldFrame, (64, 64))  # Resize to 64 cols x 64 rows
    newFrame = newFrame / 255  # Normalize values
    oldFrame = oldFrame / 255  # Normalize values
    STIcol = np.zeros((64,1))

    A = makeNearnessMatrix(newFrame, oldFrame, mode) # Generate nearness matrix

    for j in range(64):
        z  = makeZ(newFrame[:,j], oldFrame[:,j], mode)
        zt = np.transpose(z)
        Az = np.matmul(A, z)
        STIcol[j-1, :] = np.matmul(zt, Az)
    return STIcol


# Uses the IBM method from the project outline to generate an STI column
# Frame needs to be resized to a number that is a perfect square and cube
def generateSTIColumnByRow(newFrame, oldFrame, mode):
    newFrame = cv2.resize(newFrame, (64, 64))  # Resize to 64 cols x 64 rows
    oldFrame = cv2.resize(oldFrame, (64, 64))  # Resize to 64 cols x 64 rows
    newFrame = newFrame / 255  # Normalize values
    oldFrame = oldFrame / 255  # Normalize values
    STIcol = np.zeros((64,1))

    A = makeNearnessMatrix(newFrame, oldFrame, mode) # Generate nearness matrix

    for i in range(64):
        z  = makeZ(newFrame[i,:], oldFrame[i,:], mode)
        zt = np.transpose(z)
        Az = np.matmul(A, z)
        STIcol[i-1, :] = np.matmul(zt, Az)
    return STIcol


# Generate the A nearness matrix
# Note: Aij is closer to 1 for small differences
def makeNearnessMatrix(newFrame, oldFrame, mode):
    A = np.zeros((64,64))

    if (mode == "RGB"):
        dmax = math.sqrt(3)
        for i in range(64):
            for j in range(64):
                A[i,j] = 1 - (norm(newFrame[i,j] - oldFrame[i,j]) / dmax)
    
    elif (mode == "Chromaticity"):
        dmax = math.sqrt(2)
        for i in range(64):
            for j in range(64):
                oldChromaticity = RGBtoChromaticity(oldFrame[i,j])
                newChromaticity = RGBtoChromaticity(newFrame[i,j])
                A[i,j] = 1 - (norm(newChromaticity - oldChromaticity) / dmax)
    return A


# Generate the Z column
def makeZ(newCol, oldCol, mode):

    if (mode == "RGB"):
        Hold = makeColorHistogram(oldCol)
        Hnew = makeColorHistogram(newCol)
    
    elif (mode == "Chromaticity"):
        Hold = makeLuminenceHistogram(oldCol)
        Hnew = makeLuminenceHistogram(newCol)

    Hdiff = abs(Hnew - Hold) / 64  # Normalize

    z = np.ones((64,1))
    z[:,0] = np.matrix.flatten(Hdiff)  # Flatten
    return z


# Make a 4x4x4 histogram of RGB values (64 total bins)
def makeColorHistogram(vector):
    hist = np.histogramdd(vector, bins=(4,4,4), density=1)
    return hist[0]


# Create a 2D luminence histogram from a frame vector
def makeLuminenceHistogram(vector):
    rVals = []
    gVals = []
    for i in range(32):
        chromaticity = RGBtoChromaticity(vector[i])
        rVals.append(chromaticity[0, 0])
        gVals.append(chromaticity[0, 1])
    hist = np.histogram2d(rVals, gVals, bins=8, range=[
                          [0, 1], [0, 1]], density=1)
    return hist[0]


# Returns (r,g) from (R, G, B)
def RGBtoChromaticity(pixel):
    sumRGB = sum(pixel) + 1  # Add one to account for black (0, 0, 0)
    chromaticity = np.zeros((1, 2))
    chromaticity[0, 0] = pixel[0] / sumRGB  # r value
    chromaticity[0, 1] = pixel[1] / sumRGB  # g value
    return chromaticity