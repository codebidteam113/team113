# app.py
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from db import users_collection
import secrets

app = Flask(__name__)
CORS(app)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({"error": "Username already exists"}), 409

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({
        "username": username,
        "password": hashed_password,
        "auth_token": None  # initially no token
    })

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = users_collection.find_one({'username': username})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Generate a random token
    token = secrets.token_hex(32)

    # Save it in the DB
    users_collection.update_one(
        {'username': username},
        {'$set': {'auth_token': token}}
    )

    return jsonify({
        "message": "Login successful",
        "username": username,
        "auth_token": token
    }), 200

# Example protected route
@app.route('/api/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({"error": "Missing auth token"}), 401

    user = users_collection.find_one({'auth_token': token})
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401

    return jsonify({
        "username": user['username'],
        "message": "This is your profile info"
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
