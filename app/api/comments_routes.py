from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Comment, db
from app.forms import CommentForm
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


@comments_routes.route('/')
def get_comments():
    allPostComments = Comment.query.all()

    return {'allComments': [allPostComment.to_dict() for allPostComment in allPostComments]}

@comments_routes.route('/create/<user_id>/<post_id>', methods=['POST'])
def commentsFunc(user_id, post_id):

    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=user_id,
            post_id=post_id,
            text = form.data['text'],
            created_at=date.today(),
            updated_at=date.today(),
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@comments_routes.route('/delete/<comment_id>', methods=['DELETE'])
@login_required
def delete_comments(comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return {"comment_id": comment_id}



@comments_routes.route('/update/<comment_id>', methods=['PUT'])
@login_required
def update_post(comment_id):

    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(comment_id)

        comment.text = form.data['text']
        db.session.commit()
        return comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
