from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def email_valid(form, field):

    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    email = field.data

    if not re.fullmatch(regex, email):
        raise ValidationError('Please provide a valid email address')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


# def password_matches(form, field):
#     # Checking if password matches
#     print('field')
#     print('form')
#     password = form.data['password']
#     confirm_password = field.data['confirm_password']
#     # email = form.data['email']
#     # user = User.query.filter(User.email == email or User.username == email).first()
#     if password == confirm_password:
#         pass
#     else:
#         raise ValidationError('Passwords do not match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, email_valid])
    password = StringField('password', validators=[DataRequired()])
    # confirm_password = StringField('confirmed password', validators=[DataRequired()])
