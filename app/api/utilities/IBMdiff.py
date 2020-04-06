import numpy as np
from numpy.linalg import norm #For l2 norm
import cv2
import math
from flask import Response


# Generate and Save a Spatio-Temportal Image (STI) by Column
def generateByCol(videoPath):

    video = cv2.VideoCapture(videoPath)
    return Response(readFrames(video), mimetype='multipart/x-mixed-replace; boundary=frame')


# Read the video frame-by-frame to generate an STI
def readFrames(video):
    ret, oldFrame = video.read()
    if not ret:
        raise Exception("Failed to read video")
    STI = np.zeros((64, 1))

    while(video.isOpened()):
        ret, frame = video.read()
        if(ret is False):
            break  # End of video

        col = generateSTIColumnByIBM(frame, oldFrame)
        STI = np.c_[STI, col]
        oldFrame = frame

        # encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", STI[:, 1:]*255)

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
              bytearray(encodedImage) + b'\r\n')



# Uses the IBM method from the project outline to generate an STI column
# Frame needs to be resized to a number that is a perfect square and cube
def generateSTIColumnByIBM(newFrame, oldFrame):
    newFrame = cv2.resize(newFrame, (64, 64))  # Resize to 64 cols x 64 rows
    oldFrame = cv2.resize(oldFrame, (64, 64))  # Resize to 64 cols x 64 rows
    newFrame = newFrame / 255  # Normalize values
    oldFrame = oldFrame / 255  # Normalize values
    STIcol = np.zeros((64,1))

    A = makeNearnessMatrix(newFrame, oldFrame) # Generate the nearness matrix

    for j in range(64):
        z  = makeZ(newFrame[:,j], oldFrame[:,j])
        zt = np.transpose(z)
        Az = np.matmul(A, z)
        STIcol[j-1, :] = np.matmul(zt, Az)
    return STIcol


# Generate the A nearness matrix
# Note: Aij is closer to 1 for small differences
def makeNearnessMatrix(newFrame, oldFrame):
    A = np.zeros((64,64))
    dmax = math.sqrt(3)
    for i in range(64):
        for j in range(64):
            A[i,j] = 1 - (norm(newFrame[i,j] - oldFrame[i,j]) / dmax)
    return A


# Generate the Z column
def makeZ(newCol, oldCol):
    Hold = makeColorHistogram(oldCol)
    Hnew = makeColorHistogram(newCol)
    Hdiff = abs(Hnew - Hold) / 64  # Normalize

    z = np.ones((64,1))
    z[:,0] = np.matrix.flatten(Hdiff)  # Flatten
    return z


# Make a 4x4x4 histogram of RGB values (64 total bins)
def makeColorHistogram(vector):
    hist = np.histogramdd(vector, bins=(4,4,4), density=1)
    return hist[0]