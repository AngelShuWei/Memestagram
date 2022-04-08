from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey

class Post(db.Model, UserMixin):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.String(500))
    image_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post", cascade = "all, delete")
    image_likes = relationship("ImageLike", back_populates="post", cascade = "all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'image_url':self.image_url,
            'user':self.user.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments]
        }
