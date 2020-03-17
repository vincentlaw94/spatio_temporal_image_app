from flask import Flask, Blueprint, request, render_template
from app import opencv

def create_app():
    """ Factory function to start application  """
    app = Flask(__name__)

    app.url_map.strict_slashes = False
    
    register_blueprints(app)
    
    

    return app

def register_blueprints(app):
    app.register_blueprint(opencv.routes.main)
    