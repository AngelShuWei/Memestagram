const GET_USERFOLLOWED = 'follower/GET_USERFOLLOWED'


const getUserFollowed = (userFollowed) => ({
    type: GET_USERFOLLOWED,
    userFollowed
})


export const getAllUserFollowed = (userId) => async (dispatch) => {
    const response = await fetch(`/api/followers/followed/${userId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getUserFollowed(data.userSpecificFollowed))
        // console.log(data.userSpecificFollowed);
    }

    return response
}

const initialState = {};


const getAllUserFollowedReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case GET_USERFOLLOWED:
            let userFollowed = {};
            action.userFollowed.forEach(userFolloweds => {
                userFollowed[userFolloweds.id] = userFolloweds
            })
            return {
                ...userFollowed
            }
        default:
            return state;
    }
};

export default getAllUserFollowedReducer;
