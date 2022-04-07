const GET_USERFOLLOWERS = 'follower/GET_USERFOLLOWERS'


const getUserFollowers = (userFollower) => ({
    type: GET_USERFOLLOWERS,
    userFollower
})


export const getAllUserFollowers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/followers/follower/${userId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getUserFollowers(data.userSpecificFollowers))
    }

    return response
}

const initialState = {};


const getAllUserFollowerReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USERFOLLOWERS:
            let userFollower = {};
            action.userFollower.forEach(userFolloweds => {
                userFollower[userFolloweds.id] = userFolloweds
            })
            return {
                ...userFollower
            }
        default:
            return state;
    }
};

export default getAllUserFollowerReducer;
