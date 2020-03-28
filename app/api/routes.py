from flask import Blueprint, request, jsonify, send_from_directory, abort, Response

import os
import app.api.utilities.histDifferenceCol as histDiff

import numpy as np
import cv2

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
uploads_dir = os.path.join(APP_ROOT, 'uploads')
images_dir = os.path.join(APP_ROOT, 'images')

main = Blueprint("main", __name__)
@main.route('/', methods=['GET'])

def generate(file_name):

    file = os.path.join(uploads_dir, file_name)

    cap = cv2.VideoCapture(file)
    matrix = []
    # loop over frames
    while (True):

        ret, frame = cap.read()
        # end of video
        if not ret:
            break

        frame = cv2.resize(frame, (32, 32))
        # fill matrix with center colomn of each frame
        col_array = [frame[i, 16] for i in range(32)]
        matrix.append(col_array)
        frame_column = np.asarray(matrix, dtype=np.uint8)
        img = np.transpose(frame_column, (1, 0, 2))
        # encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", img)

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
              bytearray(encodedImage) + b'\r\n')


@main.route('/upload', methods=['POST'])
def upload():

    if request.method == 'POST':
        if request.files:
            file = request.files["file"]
            file.save(os.path.join(uploads_dir, file.filename))
            histDiff.generateSTI(os.path.join(uploads_dir, file.filename))
            # return response
            return "success"

    # return response
    return "fail"


@main.route('/sti_feed/<file_name>/<sti_type>')
def sti_feed(file_name, sti_type):
    print("PRINTING FILENAME:", file_name)
    print("PRINTING STI TYPE:", sti_type)
    return Response(generate(file_name), mimetype='multipart/x-mixed-replace; boundary=frame')


@main.route('/get_video/<file_name>')
def get_video(file_name):

    try:
        return send_from_directory(uploads_dir, file_name)
    except FileNotFoundError:
        abort(404)
