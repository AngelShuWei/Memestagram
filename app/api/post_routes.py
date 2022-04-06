from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Post, db
from app.forms import PostForm
from datetime import date
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
    if "image" not in request.files:
    return {"errors": "image required"}, 400

    image = request.files["image"]
    caption = request.values['caption']

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    #uploading to amazon and their response is an obj with url
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    #pull url out of obj and assign the url to the database (line 58)
    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)

    post = Post(
            image_url=url,
            caption=caption,
            user_id=current_user.id,
            created_at=date.today(),
            updated_at=date.today(),
        )
    db.session.add(post)
    db.session.commit()
    return {"url": url}
    # =================================================
    # the form regular post
    # form = PostForm()

    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     post = Post(
    #         image_url=form.data['image_url'],
    #         caption=form.data['caption'],
    #         user_id=user_id,
    #         created_at=date.today(),
    #         updated_at=date.today(),
    #     )
    #     db.session.add(post)
    #     db.session.commit()
    #     return post.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401



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
