from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Post, db, User, Channel, Message
from datetime import date
from flask_socketio import SocketIO, emit, join_room
import os

livechatting_routes = Blueprint('livechat', __name__)

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://memestagram-group-project.herokuapp.com/",
        "https://memestagram-group-project.herokuapp.com/.com"
    ]
else:
    origins = "*"

#initialize socket instance
socketio = SocketIO(cors_allowed_origins=origins)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@livechatting_routes.route('/channels', methods=['GET'])
def getChannels():
    allChannels = Channel.query.all()

    return {'allChannels': [channel.to_dict() for channel in allChannels]}


@livechatting_routes.route('/messages', methods=['GET'])
def getMessages():
    allMessages = Message.query.all()

    return {'allMessages': [message.to_dict() for message in allMessages]}



@livechatting_routes.route('/channels/create', methods=['POST'])
def createChannel():

    req = request.json

    user1Id = current_user.id
    user2Id = req['user2Id']

    channel = Channel(
        user1_id = user1Id,
        user2_id = user2Id,
        created_at=date.today(),
        updated_at=date.today(),
    )

    db.session.add(channel)
    db.session.commit()

    return channel.to_dict()


@socketio.on("chat")
def handle_chat(data):

    channelId = data['channelId']
    senderId = current_user.id
    recieverId = data['recieverId']
    join_room(channelId)
    sessionId = request.sid

    message = Message(
        channelId = channelId,
        senderId = senderId,
        recieverId = recieverId,
        content = data['content']
    )

    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast="True")


@livechatting_routes.route('/channels/delete/<channelId>', methods=['DELETE'])
def deleteChannel(channelId):

    channel = Channel.query.get(channelId)

    db.session.delete(channel)
    db.session.commit()

    return {'id': channelId}
