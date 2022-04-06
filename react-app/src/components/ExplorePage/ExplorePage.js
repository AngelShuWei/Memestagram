import './ExplorePage.css';
import React from 'react';


function ExplorePage() {
    const userPosts = useSelector(state => Object.values(state.posts))

    return(
        <div>
            {userPosts.map(post => (
                <div>
                    {post.image_url}
                </div>
            ))}
        </div>
    );
}

export default ExplorePage;
