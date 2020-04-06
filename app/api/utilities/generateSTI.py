import cv2
import os
from flask import Response
import app.api.utilities.histDiffHelper as histDiff
import app.api.utilities.copyPixel as copyPixel
import app.api.utilities.IBMdiff as IBM
APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def generateSTI(videoPath, typeSTI):

    if(typeSTI == "histDiffCol"):
        return histDiff.generateByCol(videoPath)
    elif(typeSTI == "histDiffRow"):
        return histDiff.generateByRow(videoPath)
    elif(typeSTI == "IBMdiffColRGB"):
        return IBM.generateByColRGB(videoPath)
    elif(typeSTI == "IBMdiffRowRGB"):
        return IBM.generateByRowRGB(videoPath)
    elif(typeSTI == "IBMdiffRowChr"):
        return IBM.generateByRowChr(videoPath)
    elif(typeSTI == "IBMdiffColChr"):
        return IBM.generateByColChr(videoPath)
    elif(typeSTI == "copyPixelCol"):
        return Response(copyPixel.copyPixel(videoPath, "col"), mimetype='multipart/x-mixed-replace; boundary=frame')
    elif(typeSTI == "copyPixelRow"):
        return Response(copyPixel.copyPixel(videoPath, "row"), mimetype='multipart/x-mixed-replace; boundary=frame')
        # Write to file
    #cv2.imwrite(APP_ROOT + '/images/STI.jpg', STI)
