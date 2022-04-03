from app.models import db, User
from datetime import date



# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password',created_at=date.today(),updated_at=date.today())
    yavuz = User(
        username='yavuz', email='yavuz@aa.io', password='password',created_at=date.today(),updated_at=date.today())
    angel = User(
        username='angel', email='angel@aa.io', password='password',created_at=date.today(),updated_at=date.today())
    leah = User(
        username='leah', email='leah@aa.io', password='password',created_at=date.today(),updated_at=date.today())
    philip = User(
        username='philip', email='philip@aa.io', password='password',created_at=date.today(),updated_at=date.today())


    db.session.add(demo)
    db.session.add(yavuz)
    db.session.add(angel)
    db.session.add(leah)
    db.session.add(philip)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
