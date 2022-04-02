from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey

class CommentLike(db.Model, UserMixin):
    __tablename__ = "comment_likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    user = relationship("User", back_populates="comment_likes")
    comment = relationship("Comment", back_populates="comment_likes")
