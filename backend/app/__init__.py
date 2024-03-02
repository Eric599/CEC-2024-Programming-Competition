from flask import Flask
from flask_cors import CORS
from app.api.routes import api as api_blueprint
from app.extensions import cache
from app.utils import load_and_cache_dataset


def create_app():
    # setup app
    app = Flask(__name__)

    # setup cache
    cache.init_app(app)

    # register blueprints
    app.register_blueprint(api_blueprint)

    # configure cors
    CORS(app, resources={r"/api/*": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ['Content-Type', 'Authorization'],
        "supports_credentials": True,
        "max_age": 3600,
    }})

    # load and cache data
    load_and_cache_dataset('../data')

    return app
