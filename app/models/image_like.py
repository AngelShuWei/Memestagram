from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class ImageLike(db.Model, UserMixin):
    __tablename__ = "image_likes"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)
