from app.models import db, Post
from datetime import date



def seed_posts():
    fst= Post(user_id=3,image_url='https://media.discordapp.net/attachments/959639042385936404/959639068826812496/avatars-000568636770-tpi8z4-t500x500.jpg',created_at=date.today(),updated_at=date.today())
    sec= Post(user_id=2,image_url='https://media.discordapp.net/attachments/959639042385936404/959639082839969843/download.jpg',created_at=date.today(),updated_at=date.today())
    thr= Post(user_id=3,image_url='https://media.discordapp.net/attachments/959639042385936404/959639099734650940/8ada2ca944b9baa11d8afeeb84daacd0.jpg?width=524&height=643',created_at=date.today(),updated_at=date.today())
    fou= Post(user_id=3,image_url='https://media.discordapp.net/attachments/959639042385936404/959639131254833192/057.jpg',created_at=date.today(),updated_at=date.today())
    fiv= Post(user_id=2,image_url='https://media.discordapp.net/attachments/959639042385936404/959639160476553266/static-assets-upload12271051097940939530.webp?width=655&height=644',created_at=date.today(),updated_at=date.today())
    six= Post(user_id=3,image_url='https://media.discordapp.net/attachments/959639042385936404/959639225073033257/277557749_5192280204118523_1674111490050885778_n.png?width=463&height=644',created_at=date.today(),updated_at=date.today())
    sev= Post(user_id=3,image_url='https://images-ext-1.discordapp.net/external/N3VYanF29VLcJkkRMm1xvohk-W11ilGg0hxlx_WNrnc/%3Fx34900/https/www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg?width=650&height=644',created_at=date.today(),updated_at=date.today())
    eig= Post(user_id=3,image_url='https://images-ext-1.discordapp.net/external/OwdvlJxUskmo1ipi8ci-NvtsSML6PDE5-tJPcuAEDss/%3Fx34900/https/www.thecoderpedia.com/wp-content/uploads/2020/06/Hello-World-Jokes-685x1024.jpg?width=430&height=643',created_at=date.today(),updated_at=date.today())
    nin= Post(user_id=3,image_url='https://images-ext-2.discordapp.net/external/VLLinN-BO1qeM5_OccfoI8DJp3OrrsJBOBX54HLQqcs/https/media.discordapp.net/attachments/900341135136923649/915430380067250186/hqdefault.png',created_at=date.today(),updated_at=date.today())
    ten= Post(user_id=3,image_url='https://images-ext-2.discordapp.net/external/jkEH93rJAlNe6fErFb2OU0-uRHNS2G1xCddvtJhqKms/%3Fwidth%3D678%26height%3D643/https/media.discordapp.net/attachments/900341135136923649/903118218531590144/IMG-20201231-WA0002.jpg',created_at=date.today(),updated_at=date.today())

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


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
