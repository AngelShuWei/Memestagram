const GET_FOLLOWER = 'follower/GET_FOLLOWER'

const getFollower = (followers) => ({
    type: GET_FOLLOWER,
    followers
})

export const getAllFollowers = () => async (dispatch) => {
    const response = await fetch(`/api/followers/followers/get`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getFollower(data.followerUsers))

    }

    return response
}


const initialState = {};

const followersReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_FOLLOWER:
            action.followers.forEach(follower => {
                return newState[follower.id] = follower;
            });
            return newState;

        default:
            return state;
    }
}

export default followersReducer;
