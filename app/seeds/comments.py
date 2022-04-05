from app.models import db, Comment
from datetime import date


def seed_comments():
    fst= Comment(user_id=1,post_id=1,text='yeet',created_at=date.today(),updated_at=date.today())
    sec= Comment(user_id=1,post_id=2,text='hold on',created_at=date.today(),updated_at=date.today())
    thr= Comment(user_id=3,post_id=3,text="Want to become rich fast? Go to http://buybitcoins.com.",created_at=date.today(),updated_at=date.today())
    fou= Comment(user_id=4,post_id=4,text='something',created_at=date.today(),updated_at=date.today())
    fiv= Comment(user_id=1,post_id=5,text='random stuff',created_at=date.today(),updated_at=date.today())
    six= Comment(user_id=4,post_id=6,text='rakan my fav champ',created_at=date.today(),updated_at=date.today())
    sev= Comment(user_id=2,post_id=7,text='hehehhe',created_at=date.today(),updated_at=date.today())
    eig= Comment(user_id=1,post_id=8,text='super cool stuff',created_at=date.today(),updated_at=date.today())
    nin= Comment(user_id=2,post_id=9,text='programmers am i right',created_at=date.today(),updated_at=date.today())
    ten= Comment(user_id=2,post_id=11,text='yes',created_at=date.today(),updated_at=date.today())

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

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
