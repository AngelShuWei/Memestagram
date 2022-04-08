from app.models import db, ImageLike
from datetime import date



# Adds a demo user, you can add other users here if you want
def seed_likes():

    fst= ImageLike(user_id=1,post_id=1,created_at=date.today(),updated_at=date.today())
    sec= ImageLike(user_id=1,post_id=2,created_at=date.today(),updated_at=date.today())
    thr= ImageLike(user_id=3,post_id=3,created_at=date.today(),updated_at=date.today())
    fou= ImageLike(user_id=4,post_id=4,created_at=date.today(),updated_at=date.today())
    fiv= ImageLike(user_id=1,post_id=5,created_at=date.today(),updated_at=date.today())
    six= ImageLike(user_id=4,post_id=6,created_at=date.today(),updated_at=date.today())
    sev= ImageLike(user_id=2,post_id=7,created_at=date.today(),updated_at=date.today())
    eig= ImageLike(user_id=1,post_id=8,created_at=date.today(),updated_at=date.today())
    nin= ImageLike(user_id=2,post_id=9,created_at=date.today(),updated_at=date.today())
    ten= ImageLike(user_id=2,post_id=11,created_at=date.today(),updated_at=date.today())
    elv= ImageLike(user_id=3,post_id=7,created_at=date.today(),updated_at=date.today())
    twlv= ImageLike(user_id=,post_id=8,created_at=date.today(),updated_at=date.today())
    thrt= ImageLike(user_id=2,post_id=9,created_at=date.today(),updated_at=date.today())
    frt= ImageLike(user_id=2,post_id=11,created_at=date.today(),updated_at=date.today())

    db.session.add(fst)
    db.session.add(sec)
    db.session.add(thr)
    db.session.add(fou)
    db.session.add(fiv)
    db.session.add(six)
    db.session.add(sev)
    db.session.add(eig)
    db.session.add(nin)
    db.session.add(ten)
    db.session.add(elv)
    db.session.add(twlv)
    db.session.add(thrt)
    db.session.add(frt)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
