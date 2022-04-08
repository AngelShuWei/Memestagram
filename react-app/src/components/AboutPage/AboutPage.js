import './AboutPage.css';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import yavuzPic from '../IconPics/sifu.jpeg';
import angelPic from '../IconPics/disgusted.jpg';
import leahPic from '../IconPics/images.jpg';
import philipPic from '../IconPics/philip.jpg';
import dogestagram from '../IconPics/dogestagram.png';

function AboutPage() {

    const handleYavuzClick = () => {
      window.open("https://github.com/yavuzabasiyanik");
    };

    return(
        <>
      <div className='prof-page-container'>
        <div className='prof-info-container'>
          <div className='prof-info-left'>
            <img style={{ width: "150px", height: "150px", 'borderRadius': '100px' }} src={dogestagram}></img>
          </div>
          <div className='profile-info-right'>
            <div className='prof-name'>Memestagram</div>
            <div className='prof-bio'>?</div>
          </div>
        </div>
        <div className='prof-posts-line'></div>
        <div className='prof-posts-img'>POSTS</div>

        <div className="friends-container">

            <div className="yavuz-div">
                <a target="_blank"href='https://github.com/yavuzabasiyanik'><img src={yavuzPic} style={{width:'293px', height:'293px'}} ></img></a>


            </div>
            <div className="angel-div">
                <a target="_blank"href='https://github.com/AngelShuWei'> <img src={angelPic} style={{width:'293px', height:'293px'}}></img></a>

            </div>
            <div className="leah-div">
                <a target="_blank" href='https://github.com/Leahk1m'> <img src={leahPic} style={{width:'293px', height:'293px'}}></img></a>

            </div>
            <div className="philip-div">
                <a target="_blank" href="https://github.com/philroberts13"><img src={philipPic} style={{width:'293px', height:'293px'}}></img></a>
            </div>
        </div>

      </div>
    </>
    );
}

export default AboutPage;
