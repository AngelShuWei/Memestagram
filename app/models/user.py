from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey

# follows = db.Table(
#     "follows",
#     db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(1050), nullable=False)
    profile_pic = db.Column(db.Text)
    follower_id = db.Column(db.Integer)
    followed_id = db.Column(db.Integer)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    comments = relationship("Comment", back_populates="user")
    posts = relationship("Post", back_populates="user")
    image_likes = relationship("ImageLike", back_populates="user")
    comment_likes = relationship("CommentLike", back_populates="user")
    # followers = db.relationships(
    # "User",
    # secondary=follows,
    # primaryjoin=(follows.c.follower_id == id)
    # secondaryjoin=(follows.c.followed_id == id)
    # backref=db.backref("following", lazy="dynamic"),
    # lazy="dynamic"
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
