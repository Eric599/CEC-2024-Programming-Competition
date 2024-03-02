from flask import request, jsonify
import json
from app.api import api
from app.extensions import cache


@api.route('/compute', methods=['POST'])
def compute():
    if request.content_type == 'application/x-www-form-urlencoded':
        form_data = request.form
        resources_entry = form_data.get('RESOURCES')
        preserves_entry = form_data.get('PRESERVES')

        try:
            resources = json.loads(resources_entry)
            preserves = json.loads(preserves_entry)
        except json.JSONDecodeError as e:
            return jsonify({'error': 'Invalid JSON format'}, e), 400

        if not isinstance(resources, list) or not isinstance(preserves, list):
            return jsonify({'error': 'Entries must be lists'}), 400

        computed_map = ''  # TODO NotImplemented
        cache.set('computed_map', computed_map)
        return jsonify({'message': 'success'}), 200
    else:
        return jsonify({'error': 'Content-Type must be application/x-www-form-urlencoded'}), 400


@api.route('/get-day', methods=['GET'])
def get_day():
    day = request.args.get('day', type=int)
    if day is not None:
        data = cache.get('data')
        return jsonify({'world': data['world'][day], 'rig': [10, 10], 'computed_map': ''}), 200
    else:
        return jsonify({'error': 'Missing day query parameter'}), 400
