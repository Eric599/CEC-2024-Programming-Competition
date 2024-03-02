from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.api.routes import api as api_blueprint
from app.extensions import cache
from app.utils import load_and_cache_dataset


def create_app():
    # setup app
    app = Flask(__name__)

    # setup config
    app.config.from_object(Config)

    # setup cache
    cache.init_app(app)

    # register blueprints
    app.register_blueprint(api_blueprint)

    # configure cors
    CORS(app, resources={r"/api/*": {
        "origins": app.config['CORS_ORIGINS'],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": app.config['CORS_HEADERS'],
        "supports_credentials": app.config['CORS_SUPPORTS_CREDENTIALS'],
        "max_age": app.config['CORS_MAX_AGE'],
    }})

    # load and cache data
    load_and_cache_dataset('../data')

    return app
