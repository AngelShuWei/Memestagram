import './AboutPage.css';
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import yavuzPic from '../IconPics/sifu.jpeg';
import angelPic from '../IconPics/disgusted.jpg';
import leahPic from '../IconPics/images.jpg';
import philipPic from '../IconPics/philip.jpg';
import dogestagram from '../IconPics/dogestagram.png';
import github from '../IconPics/github.png';
import angycat from '../IconPics/angy-cat.jpg';

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
                Meet the website creators below and click on the creators' post to visit their Github
            </div>
          </div>
        </div>
        <div className='prof-posts-line'></div>
        <div className='prof-posts-img'>POSTS</div>

        <div className="friends-container">

            <div className="friend-div">
                <img className="Sirv image-main"src={yavuzPic} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" href="https://github.com/yavuzabasiyanik"><img className="Sirv image-hover"src={github} style={{width:'293px', height:'293px'}} ></img></a>


                {/* <img className="yavuz-img"src={yavuzPic} style={{width:'293px', height:'293px'}}></img>
                <a className="yavuz-link"
                target="_blank"
                href='https://github.com/yavuzabasiyanik'
                >
                github
                </a>

                <a className="yavuz-link"
                target="_blank"
                href='https://www.linkedin.com/in/yavuz-abasiyanik-a4a86720a/'
                >
                    linkedin
                </a> */}
                {/* <a  onMouseOver={(e) => e.target.src={leahPic} }
                    // onMouseLeave={() => <img src={yavuzPic}></img>}
                    className="yavuz-pic"
                    target="_blank"
                    href='https://github.com/yavuzabasiyanik'
                    >
                    <img src={yavuzPic} style={{width:'293px', height:'293px'}}></img>

                </a> */}
                {/* <img src={yavuzPic} onMouseOver={(e) => e.target.src={leahPic}} onMouseLeave={(e) => e.target.src={yavuzPic}}/> */}
                {/* <img src={leahPic} onMouseLeave={(e) => e.target.src={yavuzPic}}/> */}
                {/* {isShown ?
                    <a
                    className="yavuz-pic"
                    target="_blank"
                    href='https://github.com/yavuzabasiyanik'
                    >
                    <img src={yavuzPic} style={{width:'293px', height:'293px'}} onMouseOver={() => setIsShown(true)}></img>
                    </a>
                :  <img src={leahPic} style={{width:'293px', height:'293px'}} onMouseLeave={() => setIsShown(false)}></img>
                } */}

            </div>
            <div className="friend-div">
                <img className="Sirv image-main"src={angelPic} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" href="https://github.com/AngelShuWei"><img className="Sirv image-hover"src={github} style={{width:'293px', height:'293px'}} ></img></a>

            </div>
            <div className="friend-div">
                <img className="Sirv image-main"src={angycat} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" href="https://github.com/Leahk1m"><img className="Sirv image-hover"src={github} style={{width:'293px', height:'293px'}} ></img></a>

            </div>
            <div className="friend-div">
                <img className="Sirv image-main"src={philipPic} style={{width:'293px', height:'293px'}}></img>
                <a className="friend-link" href="https://github.com/philroberts13"><img className="Sirv image-hover"src={github} style={{width:'293px', height:'293px'}} ></img></a>

            </div>
        </div>

      </div>
    </>
    );
}

export default AboutPage;
