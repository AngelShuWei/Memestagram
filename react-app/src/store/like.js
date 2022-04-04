const LOAD_LIKE = 'like/LOAD_LIKE';
const CREATE_LIKE = 'like/CREATE_LIKE';
const DELETE_LIKE = 'like/DELETE_LIKE';


const loadLike = (like) => ({
    type: LOAD_LIKE,
    like
})

const createLike = (like) => ({
    type: CREATE_LIKE,
    like
})

const deleteLike = (id) => ({
    type: DELETE_LIKE,
    id
})

export const allLikes = () => async (dispatch) => {
    const response = await fetch('/api/like');

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadLike(data))
    }
    return response
}

export const 
