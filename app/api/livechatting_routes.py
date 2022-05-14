from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Post, db, User, Channel, Message
from datetime import date


livechatting_routes = Blueprint('livechat', __name__)


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


@livechatting_routes.route('/messages/create', methods=['POST'])
def createMessage():


    req = request.json



    channelId = req['channelId']
    senderId = current_user.id
    recieverId = req['recieverId']

    message = Message(
        channelId = channelId,
        senderId = senderId,
        recieverId = recieverId,
        content = req['content']
    )

    db.session.add(message)
    db.session.commit()

    return message.to_dict()



@livechatting_routes.route('/channels/delete/<channelId>', methods=['DELETE'])
def deleteChannel(channelId):

    channel = Channel.query.get(channelId)

    db.session.delete(channel)
    db.session.commit()

    return {'id': channelId}
