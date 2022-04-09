from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credentials = field.data
    # email = field.data
    # username = field.data
    # credentials = form.data['credentials']
    user = User.query.filter(User.email == credentials or User.username == credentials).first()

    if not user:
        raise ValidationError('Credentials provided do not match a user.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credentials = form.data['credentials']
    user = User.query.filter(User.email == credentials or User.username == credentials).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    credentials = StringField('credentials', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
