from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from .post import Post

followers = db.Table(
    "followers",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(1050), nullable=False)
    profile_pic = db.Column(db.Text)
    profile_bio = db.Column(db.String(500))
    # follower_id = db.Column(db.Integer)
    # followed_id = db.Column(db.Integer)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    comments = relationship("Comment", back_populates="user")
    posts = relationship("Post", back_populates="user")
    image_likes = relationship("ImageLike", back_populates="user")
    comment_likes = relationship("CommentLike", back_populates="user")

    followed = db.relationship(
    "User",
    secondary=followers,
    primaryjoin=(followers.c.follower_id == id),
    secondaryjoin=(followers.c.followed_id == id),
    backref=db.backref("followers", lazy="dynamic"),
    lazy="dynamic"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'profile_pic':self.profile_pic,
            'profile_bio':self.profile_bio,

            # add name and profileUrl
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)
            return self.followed

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            return self.followed

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id and followers.c.followed_id != self.id).count()

    def followed_posts(self):
        return Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id).order_by(
                    Post.updated_at.desc()).all()
