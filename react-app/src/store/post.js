const LOAD_POST = 'post/LOAD_POST';
const CREATE_POST = 'post/CREATE_POST';
const DELETE_POST = 'post/DELETE_POST';


const loadPost = (posts) => ({
    type: LOAD_POST,
    posts
})

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

const deletePost = (post) => ({
    type: DELETE_POST,
    post
})

// pulling ALL users posts
export const allUserPosts = () => async (dispatch) => {

    const response = await fetch('/api/posts');

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadPost(data.userPosts))
    }
    return response
}

// create a user's post
export const postCreate = (caption, image_url, userId) => async (dispatch) => {
    const response = await fetch(`/api/posts/create/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            caption,
            image_url,
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']

    }
}

// delete a user's post
export const postDelete = (postId) => async(dispatch) => {
    const response = await fetch(`/api/posts/delete/${postId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const id = await response.json();
        dispatch(deletePost(id));
    }
}


const initialState = {};

const userPostsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_POST:
            action.posts.forEach(post => {
                return newState[post.id] = post;
            });
            return newState;
        case CREATE_POST:
            newState[action.post.id] = action.post;
            return newState;
        // case UPDATE_POST:
        //     newState[action.post.id] = action.post;
        //     return newState;
        case DELETE_POST:
            delete newState[action.post.post_id];
            return newState;
        default:
            return state;
    }
};

export default userPostsReducer;
