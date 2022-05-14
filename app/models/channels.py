from .db import db
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey



class Channel(db.Model, UserMixin):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, nullable= False);
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable= False);
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    user = relationship("User", back_populates= "channels")

    messages = relationship('Message', back_populates="channel",  cascade = "all, delete")


    def to_dict(self):
        return {
            'id':self.id,
            'user1_id':self.user1_id,
            'user2_id' : self.user2_id,
            'messages': [message.to_dict() for message in self.messages],
            'user': self.user.to_dict()
        }
