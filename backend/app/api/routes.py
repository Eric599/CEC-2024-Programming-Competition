from flask import request, jsonify
from app.api import api
from app.extensions import cache
from app.utils import get_route
import json
from app.utils import NpEncoder


@api.route('/api/compute', methods=['POST'])
def compute():
    if request.content_type == 'application/json':
        json_data = request.json['data']
        resources = json_data['resources']
        preserves = json_data['preserves']
        data = cache.get('data')

        if not isinstance(resources, list) or not isinstance(preserves, list):
            return jsonify({'error': 'Entries must be lists'}), 400
        computed_map = get_route(data, resources, preserves)
        cache.set('computed_map', computed_map)
        return jsonify({'message': 'success'}), 200
    else:
        return jsonify({'error': 'Content-Type must be application/json'}), 405


@api.route('/api/get-day', methods=['GET'])
def get_day():
    day = request.args.get('day', type=int)
    if day is not None:
        data = cache.get('data')
        computed_map = cache.get('computed_map')
        if computed_map is None:
            return jsonify({'error': 'Key: "computed_map" not found in cache'}), 404
        else:
            return jsonify({'world': data['world'][day], 'computed_map': computed_map}), 200
    else:
        return jsonify({'error': 'Missing day query parameter'}), 400


@api.route('/debug/cache', methods=['GET'])
def get_cache_contents():
    cache_data = cache.get('computed_map')
    if cache_data:
        return jsonify(json.dumps(cache_data, cls=NpEncoder)), 200
    else:
        return jsonify({'error': 'Cache data not found'}), 404
