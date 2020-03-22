from flask import Blueprint, request, jsonify, send_from_directory, abort

import os
import app.api.utilities.transitionDetector as detector

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
uploads_dir = os.path.join(APP_ROOT, 'uploads')

main = Blueprint("main", __name__)
@main.route('/a', methods=['GET'])
def register():
    print(APP_ROOT)

    return jsonify(h="hello world")
    

@main.route('/upload', methods = ['POST'])
def upload():
   
    if request.method == 'POST':
        if request.files:
            file = request.files["file"]
            file.save(os.path.join(uploads_dir,file.filename))
            detector.generateSTImg(os.path.join(uploads_dir,file.filename))
            #return response
            return "success"

           
    #return response
    return "fail"


@main.route('/get_video/<file_name>')
def get_video(file_name):
    print(file_name)
    try:
        return send_from_directory(uploads_dir, file_name)
    except FileNotFoundError:
        abort(404)
        