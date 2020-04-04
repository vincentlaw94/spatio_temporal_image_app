import numpy as np
import cv2
from flask import Response

# Generate and Save a Spatio-Temportal Image (STI) by Row


def generateByRow(videoPath):
    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video, "row"), mimetype='multipart/x-mixed-replace; boundary=frame')


# Generate and Save a Spatio-Temportal Image (STI) by Column
def generateByCol(videoPath):

    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video, "col"), mimetype='multipart/x-mixed-replace; boundary=frame')


# Read the video frame-by-frame to generate an STI
def readFrames(video, mode):
    ret, oldFrame = video.read()
    if not ret:
        raise Exception("Failed to read video")
    STI = np.zeros((32, 1))

    while(video.isOpened()):
        ret, frame = video.read()
        if(ret is False):
            break  # End of video

        # Generate the STI row by row or col by col
        if (mode == "row"):
            col = generateSTIColumnByRow(frame, oldFrame)
        elif(mode == "col"):
            col = generateSTIColumnByCol(frame, oldFrame)

        STI = np.c_[STI, col]

        oldFrame = frame
        # encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", STI[:, 1:]*255)

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
              bytearray(encodedImage) + b'\r\n')


# Compares new and old frame column-by-bolumn to generate an STI column
def generateSTIColumnByCol(newFrame, oldFrame):
    newFrame = cv2.resize(newFrame, (32, 32))  # Resize to 32 cols x 32 rows
    oldFrame = cv2.resize(oldFrame, (32, 32))  # Resize to 32 cols x 32 rows
    STIcol = np.zeros((32, 1))
    for j in range(32):
        Hold = makeLuminenceHistogram(oldFrame[:, j])
        Hnew = makeLuminenceHistogram(newFrame[:, j])
        STIcol[j-1, :] = histogramIntersection(Hold, Hnew)
    return STIcol


# Compares new and old frame column-by-bolumn to generate an STI column
def generateSTIColumnByRow(newFrame, oldFrame):
    newFrame = cv2.resize(newFrame, (32, 32))  # Resize to 32 cols x 32 rows
    oldFrame = cv2.resize(oldFrame, (32, 32))  # Resize to 32 cols x 32 rows
    STIcol = np.zeros((32, 1))
    for j in range(32):
        Hold = makeLuminenceHistogram(oldFrame[j, :])
        Hnew = makeLuminenceHistogram(newFrame[j, :])
        STIcol[j-1, :] = histogramIntersection(Hold, Hnew)
    return STIcol


# Create a 2D luminence histogram from a frame vector
def makeLuminenceHistogram(vector):
    rVals = []
    gVals = []
    for i in range(32):
        chromaticity = RGBtoChromaticity(vector[i])
        rVals.append(chromaticity[0, 0])
        gVals.append(chromaticity[0, 1])
    hist = np.histogram2d(rVals, gVals, bins=10, range=[
                          [0, 1], [0, 1]], density=1)
    return hist[0]


# Returns a scalar I based on histogram difference
# Assumes Hold and Hnew are 10 x 10 Chromaticity Histograms
def histogramIntersection(Hold, Hnew):
    I = 0
    for i in range(10):
        for j in range(10):
            I += (min(Hold[i, j], Hnew[i, j])) / 100  # Normalization
    return I


# Returns (r,g) from (R, G, B)
def RGBtoChromaticity(pixel):
    sumRGB = sum(pixel) + 1  # Add one to account for black (0, 0, 0)
    chromaticity = np.zeros((1, 2))
    chromaticity[0, 0] = pixel[0] / sumRGB  # r value
    chromaticity[0, 1] = pixel[1] / sumRGB  # g value
    return chromaticity
