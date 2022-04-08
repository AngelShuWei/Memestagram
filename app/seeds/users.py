from app.models import db, User
from datetime import date



# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', name='Mr. Demo',profile_bio='I am just a demo, leave me alone', profile_pic='https://i.kym-cdn.com/photos/images/original/001/561/371/77e.jpg',email='demo@aa.io', password='password', created_at=date.today(), updated_at=date.today())
    yavuz = User(
        username='sifuhotman', name='yavuz', profile_bio='my fav champ is rakan', profile_pic='https://upload.wikimedia.org/wikipedia/en/3/3e/Prince_Zuko.jpg',email='yavuz@aa.io', password='password', created_at=date.today(), updated_at=date.today())
    angel = User(
        username='angel', name='angelw', profile_bio='hi my name angle', profile_pic='https://i.kym-cdn.com/photos/images/original/001/561/371/77e.jpg',email='angel@aa.io', password='password', created_at=date.today(), updated_at=date.today())
    leah = User(
        username='leah', name='leahk', profile_bio='im leah and i luv memes', profile_pic='https://i.kym-cdn.com/photos/images/original/001/561/371/77e.jpg',email='leah@aa.io', password='password', created_at=date.today(), updated_at=date.today())
    philip = User(
        username='philip', name='phil', profile_bio='Its me phil. I am a huge influencer, millions look to me for their daily choices', profile_pic='https://i.kym-cdn.com/photos/images/original/001/561/371/77e.jpg',email='philip@aa.io', password='password', created_at=date.today(), updated_at=date.today())



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
