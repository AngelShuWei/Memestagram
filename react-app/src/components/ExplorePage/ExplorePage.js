import './ExplorePage.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


function ExplorePage() {
    const userPosts = useSelector(state => Object.values(state.posts))

    return(
        <div className='explore-page-container'>
            {/* <div className="explore-page-title">

            </div> */}
            <div className='explore-imgs-container'>
                {userPosts.map(post => (
                    <div className="explore-pg-img-container" key={post.id}>
                        <NavLink to={`/post/${post.id}`}><img className="explore-pg-img"src={post.image_url} alt="pic" style={{ width: "293px", height: "293px" }}></img></NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;
