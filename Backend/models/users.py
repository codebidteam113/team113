from flask import Flask, request, jsonify
from models import users

app = Flask(__name__)

# 🔐 Register
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = users.create_user(email, password)
    if not user:
        return jsonify({"error": "User already exists"}), 409

    return jsonify({"message": "User registered successfully"}), 201

# 🔑 Login (returns token)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    token = users.generate_token_for_user(email, password)
    if not token:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"token": token}), 200

# 🔒 Protected route
@app.route('/profile', methods=['GET'])
def profile():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Token "):
        return jsonify({"error": "Authorization header missing or invalid"}), 401

    token = auth_header.split(" ")[1]
    user = users.get_user_by_token(token)
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401

    return jsonify(user), 200

# 🚪 Logout (optional)
@app.route('/logout', methods=['POST'])
def logout():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Token "):
        return jsonify({"error": "Authorization header missing or invalid"}), 401

    token = auth_header.split(" ")[1]
    users.invalidate_token(token)
    return jsonify({"message": "Logged out successfully"}), 200


