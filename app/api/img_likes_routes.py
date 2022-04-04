from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import ImageLike, db

img_likes_routes = Blueprint('imglikes', __name__)

@img_likes_routes.route('/')
def get_likes():

    all_img_likes = ImageLike.query.all()

    return {'img_likes': [all_img_likes.to_dict() for all_img_like in all_img_likes]}

# @likes_routes.route('')
