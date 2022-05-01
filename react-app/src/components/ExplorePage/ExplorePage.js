import './ExplorePage.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../User.css'

function ExplorePage() {
    const userPosts = useSelector(state => Object.values(state.posts)).reverse()

    return (

        <div className='explore-page-container'>
            {/* <div className="explore-page-title">

            </div> */}
            <div className='explore-imgs-container'>
                {userPosts.map(post => (

                    <div className="prof-post-container" key={post.id}>
                        <NavLink to={`/post/${post.id}`}><img className="explore-pg-img" src={post.image_url} alt="pic" style={{ width: "293px", height: "293px" }}></img></NavLink>
                        <NavLink to={`/post/${post.id}`}><div className='overlay'>
                            <div className='prof-post-hover'>
                                <div className='prof-likes'>
                                    <i className="fa-solid fa-heart laka"></i>
                                    <div className='prof-likes-count laka'>{post.image_likes.length}</div>
                                </div>
                                <div className='prof-comments'>
                                    <i className="fa-solid fa-comment laka"></i>
                                    <div className='prof-comments-count laka'>{post.comments.length}</div>
                                </div>
                            </div>
                        </div></NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;
