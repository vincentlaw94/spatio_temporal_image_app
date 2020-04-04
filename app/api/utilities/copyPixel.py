import os

import numpy as np
import cv2


def copyPixel(videoPath, mode):
    cap = cv2.VideoCapture(videoPath)
    matrix = []
    # loop over frames
    while (True):

        ret, frame = cap.read()
        # end of video
        if not ret:
            break

        frame = cv2.resize(frame, (32, 32))
        if (mode == "col"):

            # fill matrix with center colomn of each frame
            col_array = [frame[i, 16] for i in range(32)]
            matrix.append(col_array)
        elif (mode == "row"):
            row_array = [frame[16, j] for j in range(32)]
            matrix.append(row_array)

        img = np.transpose(matrix, (1, 0, 2))

        # encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", img)

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
              bytearray(encodedImage) + b'\r\n')
