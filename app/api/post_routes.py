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


@post_routes.route('/create/<id>', methods=['POST'])
@login_required
def postsFunc(id):


    form = PostForm()

    print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            image_url=form.data['image_url'],
            caption=form.data['caption'],
            user_id=id,
            created_at=date.today(),
            updated_at=date.today(),
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
