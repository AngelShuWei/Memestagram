from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import ImageLike, db

img_likes_routes = Blueprint('likes', __name__)

@img_likes_routes.route('/')
def get_likes():

    all_img_likes = ImageLike.query.all()

    return {'all_img_likes': [img_like.to_dict() for img_like in all_img_likes]}
