from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import ImageLike, db

likes_routes = Blueprint('like', __name__)

@likes_routes.route('/')
def get_likes():
    
