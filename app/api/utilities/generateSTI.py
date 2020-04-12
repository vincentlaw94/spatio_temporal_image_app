import cv2
import os
from flask import Response
from app.api.utilities import histDiff as histDiff
from app.api.utilities import app.api.utilities.copyPixel as copyPixel
from app.api.utilities import app.api.utilities.IBMdiff as IBM
APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Switchboard for calling different STI methods
def generateSTI(videoPath, typeSTI, STIRadio, threshold_toggle, threshold, IBMRadio):

    if (STIRadio == "col"):
        if(typeSTI == "histDiff"):
            return histDiff.generateSTI(videoPath, "col", threshold_toggle, threshold)
        elif(typeSTI == "IBMdiff"):
            if (IBMRadio == "rbg"):
                return IBM.generateSTI(videoPath, "colRGB", threshold_toggle, threshold)
            elif (IBMRadio == 'chr'):
                return IBM.generateSTI(videoPath, "colChr", threshold_toggle, threshold)
        elif(typeSTI == "copyPixel"):
            return Response(copyPixel.copyPixel(videoPath, "col"), mimetype='multipart/x-mixed-replace; boundary=frame')

    elif (STIRadio == "row"):
        if(typeSTI == "histDiff"):
            return histDiff.generateSTI(videoPath, "row", threshold_toggle, threshold)
        elif(typeSTI == "IBMdiff"):
            if (IBMRadio == 'rbg'):
                return IBM.generateSTI(videoPath, "rowRGB", threshold_toggle, threshold)
            elif(IBMRadio == 'chr'):
                return IBM.generateSTI(videoPath, "rowChr", threshold_toggle, threshold)

        elif(typeSTI == "copyPixel"):
            return Response(copyPixel.copyPixel(videoPath, "row"), mimetype='multipart/x-mixed-replace; boundary=frame')
