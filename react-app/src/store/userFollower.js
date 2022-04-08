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
        console.log(data.userSpecificFollowers,'=========================HAHAH');
    }

    return response
}

const initialState = {};


const getAllUserFollowerReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USERFOLLOWERS:
            let userFollower2 = {};

            action.userFollower.forEach(userFolloweds => {
                userFollower2[userFolloweds.id] = userFolloweds
            })
            return {...userFollower2}

        default:
            return state;
    }
};

export default getAllUserFollowerReducer;
