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

@follower_routes.route('/followers/get')
def get_followers():
    followers = {'followerUsers': [followerUser.to_dict() for followerUser in current_user.get_followers()]}
    return followers


@follower_routes.route('/followedPost/get')
def followedPostGet():
    posts = current_user.followed_posts()
    print(posts, "==========================================")
    return {'followedPostsGet': [post.to_dict() for post in posts]}


@follower_routes.route('/followed/<userid>')
def getUserFollowed(userid):
    user = User.query.get(userid)

    return {'userSpecificFollowed': [userFollowed.to_dict() for userFollowed in user.get_followed()]}

@follower_routes.route('/follower/<userid>')
def getUserFollowers(userid):
    user = User.query.get(userid)

    return {'userSpecificFollowers': [userFollowed.to_dict() for userFollowed in user.get_followers()]}
