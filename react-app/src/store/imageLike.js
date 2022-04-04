const LOAD_IMG_LIKE = 'like/LOAD_LIKE';
const CREATE_IMG_LIKE = 'like/CREATE_LIKE';
const DELETE_IMG_LIKE = 'like/DELETE_LIKE';


const loadImgLike = (like) => ({
    type: LOAD_IMG_LIKE,
    like
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
    const response = await fetch('/api/like');

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadImgLike(data.img_likes))
    }
    return response
}

export const postImgLikes = (userId, photoId) => async(dispatch) => {
    const response = await fetch(`/api/like/create/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            photoId
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createImgLike(data))
    }
    return response
}

export const deletingImgLike = (photoId) => async(dispatch) => {
    const response = await fetch(`api/like/delete/${photoId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteImgLike(data))
    }
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
