from app.models import db, Post
from datetime import date



def seed_posts():
    fst= Post(user_id=1,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/959639068826812496/avatars-000568636770-tpi8z4-t500x500.jpg',created_at=date.today(),updated_at=date.today())
    sec= Post(user_id=1,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/959639082839969843/download.jpg',created_at=date.today(),updated_at=date.today())
    thr= Post(user_id=1,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/959639099734650940/8ada2ca944b9baa11d8afeeb84daacd0.jpg?width=524&height=643',created_at=date.today(),updated_at=date.today())
    fou= Post(user_id=1,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/959639131254833192/057.jpg',created_at=date.today(),updated_at=date.today())
    fiv= Post(user_id=1,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/959639160476553266/static-assets-upload12271051097940939530.webp?width=655&height=644',created_at=date.today(),updated_at=date.today())
    six= Post(user_id=2,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/959639225073033257/277557749_5192280204118523_1674111490050885778_n.png?width=463&height=644',created_at=date.today(),updated_at=date.today())
    sev= Post(user_id=2,caption='this is my caption',image_url='https://images-ext-1.discordapp.net/external/N3VYanF29VLcJkkRMm1xvohk-W11ilGg0hxlx_WNrnc/%3Fx34900/https/www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg?width=650&height=644',created_at=date.today(),updated_at=date.today())
    eig= Post(user_id=2,caption='this is my caption',image_url='https://images-ext-1.discordapp.net/external/OwdvlJxUskmo1ipi8ci-NvtsSML6PDE5-tJPcuAEDss/%3Fx34900/https/www.thecoderpedia.com/wp-content/uploads/2020/06/Hello-World-Jokes-685x1024.jpg?width=430&height=643',created_at=date.today(),updated_at=date.today())
    nin= Post(user_id=2,caption='this is my caption',image_url='https://images-ext-2.discordapp.net/external/VLLinN-BO1qeM5_OccfoI8DJp3OrrsJBOBX54HLQqcs/https/media.discordapp.net/attachments/900341135136923649/915430380067250186/hqdefault.png',created_at=date.today(),updated_at=date.today())
    ten= Post(user_id=2,caption='this is my caption',image_url='https://images-ext-2.discordapp.net/external/jkEH93rJAlNe6fErFb2OU0-uRHNS2G1xCddvtJhqKms/%3Fwidth%3D678%26height%3D643/https/media.discordapp.net/attachments/900341135136923649/903118218531590144/IMG-20201231-WA0002.jpg',created_at=date.today(),updated_at=date.today())

    fst1= Post(user_id=3,caption='this is my caption',image_url='https://images-ext-2.discordapp.net/external/w3DDAWeuhArnp1_ygn1Lo6CT-ilxTk6nY3UP9vT_ruE/%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3Dec0c3463a7b76683d2555d187f13380d18904a0b/https/external-preview.redd.it/O2oBuHGRUy_g3tSugSS_ixTRFKqL1UifcR1eXyFe15A.png',created_at=date.today(),updated_at=date.today())
    sec1= Post(user_id=3,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/961036005010448445/IMG_0426.jpg?width=741&height=644',created_at=date.today(),updated_at=date.today())
    thr1= Post(user_id=3,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/961036004586835999/image0.jpg?width=661&height=644',created_at=date.today(),updated_at=date.today())
    fou1= Post(user_id=3,caption='this is my caption',image_url='https://images-cdn.9gag.com/photo/ay9qygy_700b.jpg',created_at=date.today(),updated_at=date.today())
    fiv1= Post(user_id=3,caption='this is my caption',image_url='https://preview.redd.it/oh5iruwwi1j81.png?auto=webp&s=d0a25a42cc98464fcb28413f80c3fa244845d61b',created_at=date.today(),updated_at=date.today())
    six1= Post(user_id=4,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/960623244275228702/man-computer-smiling-meme-500px.png',created_at=date.today(),updated_at=date.today())
    sev1= Post(user_id=4,caption='this is my caption',image_url='https://preview.redd.it/561zhyyucky71.jpg?auto=webp&s=1f1d1175774c6bc7229f7e4852f3c8a41a0fac48',created_at=date.today(),updated_at=date.today())
    eig1= Post(user_id=4,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/961038031907860531/IMG_0441.jpg?width=966&height=644',created_at=date.today(),updated_at=date.today())
    nin1= Post(user_id=4,caption='this is my caption',image_url='https://i.redd.it/so68g24ftgg61.jpg',created_at=date.today(),updated_at=date.today())
    ten1= Post(user_id=4,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/961038294412562442/IMG_0448.jpg?width=636&height=643',created_at=date.today(),updated_at=date.today())
    ten2= Post(user_id=3,caption='this is my caption',image_url='https://media.discordapp.net/attachments/959639042385936404/961038482325778432/IMG_0450.webp?width=731&height=644',created_at=date.today(),updated_at=date.today())

    phil1= Post(user_id=3,caption='look at my meme',image_url='https://cdn.discordapp.com/attachments/959639042385936404/961288640321957978/f57a4a1b-dc6a-457a-8a03-937047f2f218.png',created_at=date.today(),updated_at=date.today())
    phil2= Post(user_id=3,caption='this is my caption',image_url='https://news.artnet.com/app/news-upload/2019/01/conspiracy-theory-meme-salvator-mundi.jpg',created_at=date.today(),updated_at=date.today())
    phil3= Post(user_id=3,caption='this is my caption',image_url='https://cdn.discordapp.com/attachments/959639042385936404/961040913252094012/tumblr_b1988db174c8b32b4b9c802b3cb9605a_96ef63cc_1280.jpg',created_at=date.today(),updated_at=date.today())
    phil4= Post(user_id=3,caption='this is my caption',image_url='https://cdn.discordapp.com/attachments/959639042385936404/961041008517324830/tumblr_1e2c055fc4f66ddf68a1509307bdd5df_d3619f73_1280.jpg',created_at=date.today(),updated_at=date.today())
    phil5= Post(user_id=3,caption='this is my caption',image_url='https://cdn.discordapp.com/attachments/959639042385936404/961037114202546286/IMG_0444.jpg',created_at=date.today(),updated_at=date.today())

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
    db.session.add(ten2)

    db.session.add(fst1)
    db.session.add(sec1)
    db.session.add(thr1)
    db.session.add(fou1)
    db.session.add(fiv1)
    db.session.add(six1)
    db.session.add(sev1)
    db.session.add(eig1)
    db.session.add(nin1)
    db.session.add(ten1)

    db.session.add(phil1)
    db.session.add(phil2)
    db.session.add(phil3)
    db.session.add(phil4)
    db.session.add(phil5)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
