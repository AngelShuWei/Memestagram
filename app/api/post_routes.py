from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Post, db
from app.forms import PostForm
from datetime import date

post_routes = Blueprint('posts',__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('/')
# @login_required
def get_posts():

    allUserPosts = Post.query.all()

    return {'userPosts': [allUserPost.to_dict() for allUserPost in allUserPosts]}

@post_routes.route('/create/<user_id>', methods=['POST'])
@login_required
def postsFunc(user_id):

    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            image_url=form.data['image_url'],
            caption=form.data['caption'],
            user_id=user_id,
            created_at=date.today(),
            updated_at=date.today(),
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@post_routes.route('/delete/<post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    return {"post_id": post_id}


@post_routes.route('/update/<post_id>', methods=['PUT'])
@login_required
def update_post(post_id):

    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(post_id)

        post.caption = form.data['caption']
        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
