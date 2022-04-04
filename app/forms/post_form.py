from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired , URL , Email, ValidationError
from app.models import User


class PostForm(FlaskForm):
    caption = StringField('caption', validators=[DataRequired()])
    image_url = StringField('image',validators=[DataRequired()])
    user_id = StringField('userid')
