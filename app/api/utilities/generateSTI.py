import cv2
import os
import app.api.utilities.histDiffHelper as histDiff

APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def generateSTI(videoPath, typeSTI):

    if(typeSTI == "Histogram Differences"):
        STI = histDiff.generateByCol(videoPath)
    elif(typeSTI == "Histogram Differences by Row"):
        STI = histDiff.generateByRow(videoPath)

    #Write to file
    cv2.imwrite(APP_ROOT + '/images/STI.jpg', STI)