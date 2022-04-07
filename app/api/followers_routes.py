from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db
from datetime import date

follower_routes = Blueprint('followers', __name__)

@follower_routes.route('/follow/<userid>')
def add_followers(userid):
    user = User.query.get(userid)

    if current_user.is_following(user):
        g = current_user.unfollow(user)
        db.session.add(user)
        db.session.commit()

        return {'followedUsers': userid}
    else:
        g = current_user.follow(user)
        db.session.add(user)
        db.session.commit()
        return {'followedUsers': [followedUser.to_dict() for followedUser in current_user.get_followed()]}


@follower_routes.route('/followed/get')
def get_followed():
    followed = {'followedUsers': [followedUser.to_dict() for followedUser in current_user.get_followed()]}
    return followed
