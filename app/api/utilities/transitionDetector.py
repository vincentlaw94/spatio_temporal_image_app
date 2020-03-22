import numpy as np
import cv2
import os

APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


#Generate and Save a Spatio-Temportal Image from the video at videoPath
def generateSTImg(videoPath):
    video = cv2.VideoCapture(videoPath)
    STI = readFrames(video)
    STI *= 255
    cv2.imwrite( APP_ROOT + '/images/STI.jpg', STI )


#Read frames sequentially to generate an STI
def readFrames(video):
    frameCount = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    STI = np.zeros( (31 , frameCount) ) #Skips first frame
    j = 0
    #Iterate through each frame to generate the STI
    while(video.isOpened()):
        ret, frame = video.read()
        if(ret is False): break  #End of video
        STI[:,[j]] = generateSTImgColumn(frame)
        j += 1
    return STI


#Process a frame and generate a column of the Spatio-Temporal Image
#STIcol is filled top to bottom
def generateSTImgColumn(frame):
    frame  = cv2.resize(frame, (32, 32)) #Resize to 32 cols x 32 rows
    STIcol = np.zeros((31, 1))           #Col size is one less than frame's
    for j in range(32):
        if(j == 0): 
            Hold = makeLuminenceHistogram(frame[:,j])
        elif(j == 1): 
            Hnew = makeLuminenceHistogram(frame[:,j])
            STIcol[j-1,:] = histogramIntersection(Hold, Hnew)
        else:
            Hold = Hnew
            Hnew = makeLuminenceHistogram(frame[:,j])
            STIcol[j-1,:] = histogramIntersection(Hold, Hnew)
    return STIcol
    

#Makes a column vector based on histogram difference 
#Assumes Hold and Hnew are 6 x 6 Chromaticity Histograms
def histogramIntersection(Hold, Hnew):
    I = 0
    for i in range(5):
        for j in range(5): 
            I += (min(Hold[i-1,j-1], Hnew[i-1,j-1])) / 36 
    return I


#Create a 2D luminence histogram from a frame column
def makeLuminenceHistogram(column):
    rVals = []
    gVals = []
    for i in range(32):
            chromaticity = RGBtoChromaticity(column[i])
            rVals.append(chromaticity[0, 0])
            gVals.append(chromaticity[0, 1])
    hist = np.histogram2d(rVals, gVals, bins=6, range=[[0,1],[0,1]], density=1)
    return hist[0]


#Returns (r,g) from (R, G, B)
def RGBtoChromaticity(pixel):
    sumRGB = sum(pixel) + 1  #Add one to account for black (0, 0, 0)
    chromaticity = np.zeros((1, 2))
    chromaticity[0, 0] = pixel[0] / sumRGB  #r value
    chromaticity[0, 1] = pixel[1] / sumRGB  #g value
    return chromaticity