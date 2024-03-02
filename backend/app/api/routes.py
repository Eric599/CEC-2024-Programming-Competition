from flask import request, jsonify
from app.api import api
from app.extensions import cache


@api.route('/api/compute', methods=['POST'])
def compute():
    if request.content_type == 'application/json':
        json_data = request.json['data']
        resources = json_data['resources']
        preserves = json_data['preserves']

        if not isinstance(resources, list) or not isinstance(preserves, list):
            return jsonify({'error': 'Entries must be lists'}), 400

        computed_map = ''  # TODO NotImplemented
        cache.set('computed_map', computed_map)
        return jsonify({'message': 'success'}), 200
    else:
        return jsonify({'error': 'Content-Type must be application/json'}), 405


@api.route('/api/get-day', methods=['GET'])
def get_day():
    day = request.args.get('day', type=int)
    if day is not None:
        data = cache.get('data')
        return jsonify({'world': data['world'][day], 'rig': [10, 10], 'computed_map': ''}), 200
    else:
        return jsonify({'error': 'Missing day query parameter'}), 400
