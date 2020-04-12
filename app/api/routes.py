from flask import Blueprint, request, jsonify, send_from_directory, abort, Response

import os
from app.api.utilities import generateSTI as generateSTI

import numpy as np
import cv2

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
uploads_dir = os.path.join(APP_ROOT, 'uploads')
images_dir = os.path.join(APP_ROOT, 'images')

main = Blueprint("main", __name__)


@main.route('/upload', methods=['POST'])
def upload():

    if request.method == 'POST':
        if request.files:
            file = request.files["file"]
            file.save(os.path.join(uploads_dir, file.filename))
            # return response
            return "success"

    # return response
    return "fail"


@main.route('/sti_feed/<file_name>/<sti_type>/<sti_radio>/<threshold_toggle>/<threshold_level>/<ibm_radio>')
def sti_feed(file_name, sti_type, sti_radio, threshold_toggle, threshold_level, ibm_radio):
    return generateSTI.generateSTI(os.path.join(uploads_dir, file_name), sti_type, sti_radio, threshold_toggle, threshold_level, ibm_radio)


@main.route('/get_video/<file_name>')
def get_video(file_name):

    try:
        return send_from_directory(uploads_dir, file_name)
    except FileNotFoundError:
        abort(404)
