from pymongo import MongoClient

# Mongo URI — replace with your real URI or load from .env
MONGO_URI = "mongodb+srv://shreechavan2325:l9IcjPkoDtvyDzl1@cluster0.h0z9rgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create Mongo client
client = MongoClient(MONGO_URI)

# Get your database
db = client["wanderlustcanvas"]
users_collection = db['users']

users_collection.create_index([("email", ASCENDING)], unique=True)

