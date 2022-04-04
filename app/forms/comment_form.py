from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired , URL , Email, ValidationError
from app.models import User, Post, Comment


class CommentForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])
    user_id = StringField('userid')
    post_id = StringField('postid')
