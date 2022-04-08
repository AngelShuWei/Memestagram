import './AboutPage.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import yavuzPic from '../IconPics/sifu.jpeg';
import angelPic from '../IconPics/disgusted.jpg';
import leahPic from '../IconPics/images.jpg';
import philipPic from '../IconPics/philip.jpg';

function AboutPage() {
    return(
        <>
      <div className='prof-page-container'>
        <div className='prof-info-container'>
          <div className='prof-info-left'>
            <img style={{ width: "150px", height: "150px", 'borderRadius': '100px' }}></img>
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
                <img src={yavuzPic} style={{width:'293px', height:'293px'}}></img>

            </div>
            <div className="angel-div">
                <img src={angelPic} style={{width:'293px', height:'293px'}}></img>

            </div>
            <div className="leah-div">
                <img src={leahPic} style={{width:'293px', height:'293px'}}></img>

            </div>
            <div className="philip-div">
                <img src={philipPic} style={{width:'293px', height:'293px'}}></img>

            </div>
        </div>

      </div>
    </>
    );
}

export default AboutPage;
