import './AboutPage.css';
import React from 'react';
import yavuzPic from '../IconPics/yavuz.jpg';
import angelPic from '../IconPics/angel.png';
import leahPic from '../IconPics/leah.jpg';
import philipPic from '../IconPics/phil.jpg';
import dogestagram from '../IconPics/dogestagram.png';
import linkedin from '../IconPics/new-li.png';

function AboutPage() {
    return(
        <>
      <div className='prof-page-container'>
        <div className='prof-info-container'>
          <div className='prof-info-left'>
            <img className="doggo-meme"src={dogestagram}></img>
          </div>
          <div className='profile-info-right'>
            <div className='prof-username'>
                Memestagram
            </div>
            <div className='prof-bio'>
                <h3>Website Creators <br/></h3>
                Welcome to Memestagram! <br/>
                Meet the website creators below and click on the creators' post to visit their Linkedin!
            </div>
          </div>
        </div>
        <div className='prof-posts-line'></div>
        <div className='prof-posts-img'>POSTS</div>

        <div className="friends-container">

            <div className="friend-div">
                <img className="Sirv image-main" id="friend-pic"src={yavuzPic} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" target="_blank" href="https://www.linkedin.com/in/yavuzabasiyanik/"><img className="Sirv image-hover"src={linkedin} style={{width:'293px', height:'293px'}} ></img></a>

            </div>
            <div className="friend-div">
                <img className="Sirv image-main" id="friend-pic"src={angelPic} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" target="_blank" href="https://www.linkedin.com/in/angel-wei-21952b16a/"><img className="Sirv image-hover"src={linkedin} style={{width:'293px', height:'293px'}} ></img></a>

            </div>
            <div className="friend-div">
                <img className="Sirv image-main" id="friend-pic"src={leahPic} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" target="_blank" href="https://www.linkedin.com/in/leahk1m"><img className="Sirv image-hover"src={linkedin} style={{width:'293px', height:'293px'}} ></img></a>

            </div>
            <div className="friend-div">
                <img className="Sirv image-main" id="friend-pic"src={philipPic} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" target="_blank" href="https://www.linkedin.com/in/philip-roberts-app407/"><img className="Sirv image-hover"src={linkedin} style={{width:'293px', height:'293px'}} ></img></a>

            </div>
        </div>

      </div>
    </>
    );
}

export default AboutPage;
