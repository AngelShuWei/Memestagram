const GET_FOLLOWER_POST = 'follower/GET_POST'

const getFollorPost = (postsFollowed) => ({
    type: GET_FOLLOWER_POST,
    postsFollowed
});



export const getAllPostFollowed = () => async(dispatch) => {
    const response = await fetch(`/api/followers/followedPost/get`);

    if( response.ok){
        const data = await response.json();
        dispatch(getFollorPost(data.followedPostsGet));
    }

    return response
}


const initialState = {};


const getAllFollowedPostReducer = (state = initialState, action) => {
    let newState = {...state}

    switch(action.type) {

        case GET_FOLLOWER_POST:

            action.postsFollowed.forEach(follower => {
                return newState[follower.id] = follower;
            });
            return newState;
        default:
            return state
    }
}

export default getAllFollowedPostReducer;
