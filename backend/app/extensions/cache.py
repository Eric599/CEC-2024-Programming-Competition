from flask_caching import Cache

config = {'CACHE_TYPE': 'simple', 'CACHE_DEFAULT_TIMEOUT': 300}

cache = Cache(config=config)
