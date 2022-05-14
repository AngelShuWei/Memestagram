from .db import db
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin

class Message(db.Model, UserMixin):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    channelId = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    senderId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recieverId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content= db.Column(db.Text,  nullable=False)

    channel = relationship('Channel', back_populates="messages")


    def to_dict(self):
        return{
            'id': self.id,
            'channelId': self.channelId,
            'senderId': self.senderId,
            'recieverId': self.recieverId,
            'content': self.content,
        }
