from app.models import db, followers
from datetime import date



# Adds a demo user, you can add other users here if you want
def seed_followers():

    fst= followers(follower_id=1, followed_id=3, created_at=date.today(),updated_at=date.today())


    db.session.add(fst)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_followers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
