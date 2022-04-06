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

    else:

        g = current_user.follow(user)

    db.session.add(user)
    db.session.commit()

    return user.to_dict()


# @follower_routes.route('/unfollow/<userid>')
# def delete_follower(userid):
#     user = User.query.get(userid)
#     g = current_user.unfollow(user)
#     db.session.delete(g)
#     db.session.commit()

#     return user.to_dict()
