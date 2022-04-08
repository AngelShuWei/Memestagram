const LOAD_POST = 'post/LOAD_POST';
const CREATE_POST = 'post/CREATE_POST';
const DELETE_POST = 'post/DELETE_POST';
const UPDATE_POST = 'post/UPDATE_POST';


const loadPost = (posts) => ({
    type: LOAD_POST,
    posts
})

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

const deletePost = (id) => ({
    type: DELETE_POST,
    id
})

const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

// pulling ALL users posts
export const allUserPosts = () => async (dispatch) => {

    const response = await fetch('/api/posts/');

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadPost(data.userPosts))
    }
    return response
}

// create a user's post
// no json.stringify because it will destory the data form
export const postCreate = (data, userId) => async (dispatch) => {
    const response = await fetch(`/api/posts/create/${userId}`, {
        method: 'POST',
        body: data
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data))
    }

    return response

    //     return null;
    // } else if (response.status < 500) {
    //     const data = await response.json();
    //     if (data.errors) {
    //         return data.errors;
    //     }
    // } else {
    //     return ['An error occurred. Please try again.']

    // }
}

// update a post
export const updateUsersPost = (caption,image_url,postId) => async (dispatch) => {

    const response = await fetch(`/api/posts/update/${postId}`,{
        method: 'PUT',
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
        await dispatch(updatePost(data))
    }
    return response
}


// delete a user's post
export const postDelete = (postId) => async(dispatch) => {
    const response = await fetch(`/api/posts/delete/${postId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deletePost(data.post_id));
    }
}


const initialState = {};

const userPostsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_POST:
            action.posts.forEach(post => {
                newState[post.id] = post;
            });
            return {...newState};
        case CREATE_POST:
            newState[action.post.id] = action.post;
            return newState;
        case UPDATE_POST:
            newState[action.post.id] = action.post;
            return newState;
        case DELETE_POST:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default userPostsReducer;
