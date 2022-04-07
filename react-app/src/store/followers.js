const ADD_FOLLOWER = 'follower/ADD_FOLLOWER'
const GET_FOLLOWED = 'follower/GET_FOLLOWER'
const DELETE_FOLLOWER = 'follower/DELETE_FOLLOWER'

const addFollower = (followedUsers) => ({
    type: ADD_FOLLOWER,
    followedUsers
})

const getFollowed = (followed) => ({
    type: GET_FOLLOWED,
    followed
})

const removeFollower = (followedUsers) => ({
    type: DELETE_FOLLOWER,
    followedUsers
})

export const createFollower = (userid) => async (dispatch) => {
    const response = await fetch(`/api/followers/follow/${userid}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(addFollower(data.followedUsers))
    }
    return response

}

export const getAllFollowed = () => async (dispatch) => {
    const response = await fetch(`/api/followers/followed/get`)

    if (response.ok) {
        const data = await response.json()
        console.log(data.followedUsers);
        dispatch(getFollowed(data.followedUsers))

    }

    return response
}

// export const deleteFollower = (userid) => async (dispatch) => {
//     const response = await fetch(`/api/followers/follow/${userid}`)

//     if (response.ok) {
//         const data = await response.json()
//         dispatch(removeFollower(data))
//     }
//     return response

// }

const initialState = {};

const followedReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_FOLLOWER:

            if(Array.isArray(action.followedUsers)){
                action.followedUsers.forEach(followedUser => {
                    return newState[followedUser.id] = followedUser;
                });
            }else{
                delete newState[action.followedUsers];
            }
            return newState;


        case GET_FOLLOWED:
            action.followed.forEach(follower => {
                return newState[follower.id] = follower;
            });
            return newState;

        default:
            return state;
    }
};

export default followedReducer;
