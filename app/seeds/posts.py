from app.models import db, Post
from datetime import date



def seed_posts():
    fst= Post(user_id=1,caption='this is my grandmas favorite meme',image_url='https://miro.medium.com/v2/resize:fit:1400/1*1L-wyk1Kk2Dd-79gb0AvPw.jpeg',created_at=date.today(),updated_at=date.today())
    sec= Post(user_id=1,caption='I was kicked out of the group chat for this one',image_url='https://uploads-ssl.webflow.com/5f3c19f18169b62a0d0bf387/60d33bf456d81ff850d41d2e_91ZWM5Ez2aBXw3zcOIgPLP7XnuFW_exwhPzdToPa_AsEcV0Pw837S_kUbYpfpCUAZCLUSZ0_rdV_dUaZRLyz-wOKOMyEi7IaVDvU-tzmpbaUDKY9TNY5GexvJ9ei2R-LTqpfaaQD.png',created_at=date.today(),updated_at=date.today())
    thr= Post(user_id=1,caption='so toxic',image_url='https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2Ffasal-engineering%2Ffunniest-software-development-memes-ever-f383ccf32a39&psig=AOvVaw0FiGY2_3RJIJhhL_sZWl1K&ust=1705111324266000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOi5t-jg1oMDFQAAAAAdAAAAABAd',created_at=date.today(),updated_at=date.today())
    fou= Post(user_id=1,caption='This is the most boomer meme ever',image_url='https://uploads-ssl.webflow.com/5f3c19f18169b62a0d0bf387/60d33be8cf4ba7565123c8bc_YPD3ulQQAGQpOcnqIm3QzSTRgzmr1SexpW9ZjMpJ1mAnUxx4iF05XOTu44sk0qQG-8XgBcYmGZGAD-5SAZvJl3TjtmhgWnn-w0C2XKwhBscV78RVvhwZfyp0v_Pa6sNj5zxpOvRW.png',created_at=date.today(),updated_at=date.today())
    fiv= Post(user_id=1,caption=':)',image_url='https://res.cloudinary.com/practicaldev/image/fetch/s--lxeHA9PR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/1200/1%2ALnsvy3K5r3no_xSeDVNIsA.png',created_at=date.today(),updated_at=date.today())
    six= Post(user_id=2,caption='funny',image_url='https://res.cloudinary.com/practicaldev/image/fetch/s--L0oKjULP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/1200/1%2A0VaTwYF3RdMFp1PjY_1NqA%402x.jpeg',created_at=date.today(),updated_at=date.today())
    sev= Post(user_id=2,caption='welcome to the playground',image_url='https://images-ext-1.discordapp.net/external/N3VYanF29VLcJkkRMm1xvohk-W11ilGg0hxlx_WNrnc/%3Fx34900/https/www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg?width=650&height=644',created_at=date.today(),updated_at=date.today())
    eig= Post(user_id=2,caption='you guys seen this?',image_url='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.redbubble.com%2Fi%2Fposter%2FSoftware-engineer-meme-by-bubble0bum%2F65929481.LVTDI&psig=AOvVaw0FiGY2_3RJIJhhL_sZWl1K&ust=1705111324266000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOi5t-jg1oMDFQAAAAAdAAAAABBf',created_at=date.today(),updated_at=date.today())
    nin= Post(user_id=2,caption='as a child',image_url='https://images-ext-2.discordapp.net/external/VLLinN-BO1qeM5_OccfoI8DJp3OrrsJBOBX54HLQqcs/https/media.discordapp.net/attachments/900341135136923649/915430380067250186/hqdefault.png',created_at=date.today(),updated_at=date.today())
    ten= Post(user_id=2,caption='where are you xayah?',image_url='https://res.cloudinary.com/teepublic/image/private/s--w-wL7lrg--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1659529775/production/designs/33857937_0.jpg',created_at=date.today(),updated_at=date.today())

    fst1= Post(user_id=3,caption='this still makes me laugh',image_url='https://media.licdn.com/dms/image/C5622AQG7y5nirzgi-g/feedshare-shrink_800/0/1663763199221?e=2147483647&v=beta&t=QPlxp_wqKfgDmE3V4n1Xd-HMIZNeKJq3YbPcGokFmrg',created_at=date.today(),updated_at=date.today())
    sec1= Post(user_id=3,caption='i am dead',image_url='https://media.discordapp.net/attachments/959639042385936404/961036005010448445/IMG_0426.jpg?width=741&height=644',created_at=date.today(),updated_at=date.today())
    thr1= Post(user_id=3,caption='i am hungry',image_url='https://img-9gag-fun.9cache.com/photo/awZpRLy_460s.jpg',created_at=date.today(),updated_at=date.today())
    fou1= Post(user_id=3,caption='to be honest this meme is the funniest thing I have ever seen',image_url='https://i.redd.it/h8uhxvhurdh51.jpg',created_at=date.today(),updated_at=date.today())
    fiv1= Post(user_id=3,caption=':))))))))))',image_url='https://preview.redd.it/oh5iruwwi1j81.png?auto=webp&s=d0a25a42cc98464fcb28413f80c3fa244845d61b',created_at=date.today(),updated_at=date.today())
    six1= Post(user_id=4,caption='hahahahhahahhaha',image_url='https://miro.medium.com/v2/resize:fit:1128/0*2ZP-YzsIbwF9jRep.jpg',created_at=date.today(),updated_at=date.today())
    sev1= Post(user_id=4,caption='I havent stopped crying laughing about this',image_url='https://preview.redd.it/561zhyyucky71.jpg?auto=webp&s=1f1d1175774c6bc7229f7e4852f3c8a41a0fac48',created_at=date.today(),updated_at=date.today())
    eig1= Post(user_id=4,caption='hello :)',image_url='https://img.devrant.com/devrant/rant/r_4413239_Rr7Rv.jpg',created_at=date.today(),updated_at=date.today())
    nin1= Post(user_id=4,caption='these are the memes that I love',image_url='https://i.redd.it/so68g24ftgg61.jpg',created_at=date.today(),updated_at=date.today())
    ten1= Post(user_id=4,caption='another one',image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYcfpxhTo4Lmm2rgJIuUnF0SkB17b-XSS7g&usqp=CAU',created_at=date.today(),updated_at=date.today())
    ten2= Post(user_id=3,caption='this is my caption',image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbX4Hvi6aH0r8U0GdhldW2iMG88HYxj_2Ggg&usqp=CAU',created_at=date.today(),updated_at=date.today())

    phil1= Post(user_id=5,caption='look at my meme',image_url='https://i.imgflip.com/6unvjk.jpg',created_at=date.today(),updated_at=date.today())
    phil2= Post(user_id=5,caption='I will never stop laughing at this',image_url='https://news.artnet.com/app/news-upload/2019/01/conspiracy-theory-meme-salvator-mundi.jpg',created_at=date.today(),updated_at=date.today())
    phil3= Post(user_id=5,caption='this is my caption',image_url='https://media.licdn.com/dms/image/C5622AQE0dDK5UqM8Lw/feedshare-shrink_2048_1536/0/1678882905478?e=2147483647&v=beta&t=O-z3IZpHkKQxiIx78w3nEMOrTyClnMB89KZLBAGxr8A',created_at=date.today(),updated_at=date.today())
    phil4= Post(user_id=5,caption='Coming up with captions is harder than you guys think',image_url='https://programmerhumor.io/wp-content/uploads/2021/08/programmerhumor-io-programming-memes-e03d685c94712c7.png',created_at=date.today(),updated_at=date.today())
    phil5= Post(user_id=5,caption='lollllllll',image_url='https://i.imgur.com/Z4wgzBJ.png',created_at=date.today(),updated_at=date.today())

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
