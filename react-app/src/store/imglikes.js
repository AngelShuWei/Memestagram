const LOAD_IMG_LIKE = 'like/LOAD_IMG_LIKE';
const CREATE_IMG_LIKE = 'like/CREATE_IMG_LIKE';
const DELETE_IMG_LIKE = 'like/DELETE_IMG_LIKE';

const loadImgLike = (likes) => ({
    type: LOAD_IMG_LIKE,
    likes
})

const createImgLike = (like) => ({
    type: CREATE_IMG_LIKE,
    like
})

const deleteImgLike = (id) => ({
    type: DELETE_IMG_LIKE,
    id
})

export const allImgLikes = () => async (dispatch) => {
    const response = await fetch('/api/imglikes/');

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadImgLike(data.allImglikes))
    }
    return response
}

export const postImgLikes = (userId, postId) => async(dispatch) => {
    const response = await fetch(`/api/imglikes/create/${userId}/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            postId
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createImgLike(data))
    }
    return response
}

export const deletingImgLike = (imglikes_id) => async(dispatch) => {
    const response = await fetch(`/api/imglikes/delete/${imglikes_id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteImgLike(data.imglikes_id))
    }

    return response;
}

const initialState = {};

const likesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_IMG_LIKE:
            action.likes.forEach(like => {
                return newState[like.id] = like;
            });
            return newState;
        case CREATE_IMG_LIKE:
            newState[action.like.id] = action.like;
            return newState;
        case DELETE_IMG_LIKE:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default likesReducer;
