from flask import Flask, Blueprint, request, render_template
from app import api
import os


def create_app():
    """ Factory function to start application  """
    app = Flask(__name__, static_url_path='/', static_folder='../client/build')

    app.url_map.strict_slashes = False

    register_blueprints(app)

    return app


def register_blueprints(app):
    app.register_blueprint(api.routes.main)
