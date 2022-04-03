const CREATE_POST = 'session/CREATE_POST';



const createPost = (post) => ({
    type: CREATE_POST,
    post
})



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
