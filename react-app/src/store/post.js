const CREATE_POST = 'post/CREATE_POST';

const LOAD_POST = 'post/LOAD_POST';

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

const loadPost = (posts) => ({
    type: LOAD_POST,
    posts
})

export const allUserPosts = () => async (dispatch) => {

    const response = await fetch('/api/posts');

    if(response.ok){
        const data = await response.json();
        dispatch(loadPost(data.allUserPosts))

    }

    return response

}

export const postCreate = (caption, image_url,userId) => async (dispatch) => {
    const response = await fetch(`/api/posts/create/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            caption,
            image_url,
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']

    }
}


const initialState = {}

export default userPostsReducer = (state = initialState,action)=> {

    switch(action.type){
        
    }
}
