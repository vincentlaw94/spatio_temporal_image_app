from flask import Blueprint, request, jsonify


main = Blueprint("main", __name__)
@main.route('/a', methods=['GET'])
def register():
    print("hello world")
    return jsonify(h="hello world")
    

