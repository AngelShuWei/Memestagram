from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Comments, db
# from app.forms import PostForm
from datetime import date

comments_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comments_routes('/')
def get_comments():
    allPostsComments = Comments.query.all()

    return {'allComments': [allPost.to_dict() for allUserPost in allUserPosts]}
