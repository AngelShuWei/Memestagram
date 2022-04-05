from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import ImageLike, db
from app.forms import ImageLikesForm
from datetime import date


image_likes_route = Blueprint('imagelikesroute',__name__)



@image_likes_route.route('/')
def get_imglikes():
    imglikes = ImageLike.query.all()

    return {'allImglikes': [imglike.to_dict() for imglike in imglikes]}



@image_likes_route.route('/create/<user_id>/<post_id>', methods=['POST'])
def create_imglikes(user_id, post_id):

    form = ImageLikesForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        imglikes = ImageLike(
            user_id=user_id,
            post_id=post_id,
            created_at=date.today(),
            updated_at=date.today(),
        )
        db.session.add(imglikes)
        db.session.commit()
        return imglikes.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@image_likes_route.route('/delete/<imglikes_id>', methods=['DELETE'])
def delete_imglikes(imglikes_id):

    imglike = ImageLike.query.get(imglikes_id)
    db.session.delete(imglike)
    db.session.commit()
    return {"imglikes_id": imglikes_id}
