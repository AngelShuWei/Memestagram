const ADD_FOLLOWER = 'follower/ADD_FOLLOWER'
const REMOVE_FOLLOWER = 'follower/REMOVE_FOLLOWER'


const addFollower = (follower) => ({
    type: ADD_FOLLOWER,
    follower
})

const removeFollower = (follower) => ({
    type: REMOVE_FOLLOWER,
    follower
})

export const createFollower = (userid) => async (dispatch) => {
    const response = await fetch(`/api/followers/follow/${userid}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(addFollower(data))
    }
    return response

}

export const deleteFollower = (userid) => async (dispatch) => {
    const response = await fetch(`/api/followers/follow/${userid}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(removeFollower(data))
    }
    return response

}

// const initialState = {};

// const userPostsReducer = (state = initialState, action) => {
//     let newState = {...state};
//     switch (action.type) {

//         case CREATE_POST:
//             newState[action.post.id] = action.post;
//             return newState;
//         case DELETE_POST:
//             delete newState[action.id];
//             return newState;
//         default:
//             return state;
//     }
// };

// export default userPostsReducer;
