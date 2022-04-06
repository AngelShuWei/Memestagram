import './ExplorePage.css';
import React from 'react';
import { useSelector } from 'react-redux';


function ExplorePage() {
    const userPosts = useSelector(state => Object.values(state.posts))

    return(
        <div>
            {userPosts.map(post => (
                <div>
                    <img src={post.image_url}></img>
                </div>
            ))}
        </div>
    );
}

export default ExplorePage;
