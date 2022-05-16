# from flask_socketio import SocketIO, emit
# import os

# #create socketio instance
# socketio = SocketIO()

# if os.environ.get("FLASK_ENV") == "production":
#   origins = [
#     "http://memestagram-group-project.herokuapp.com/"
#     "https://memestagram-group-project.herokuapp.com/.com",
#   ]
# else:
#   origins = "*"

# #initialize socket instance
# socketio = SocketIO(cors_allowed_origins=origins)

# #handle chat messages
# @socketio.on("chat")
# def handle_chat(data):
#   print(data,'=====')

#   channelId = data['channelId']
#   senderId = current_user.id
#   recieverId = data['recieverId']

#   message = Message(
#       channelId = channelId,
#       senderId = senderId,
#       recieverId = recieverId,
#       content = data['content']
#   )

#   db.session.add(message)
#   db.session.commit()

#   emit("chat", data, broadcast=True)
