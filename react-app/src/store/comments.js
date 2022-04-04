const LOAD_COMMENTS = 'comment/LOAD_COMMENTS';
const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';



const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
})



// load all comments on a post
export const allPostComments = () => async (dispatch) => {

    const response = await fetch('/api/comments');

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadComments(data.allComments))
    }
    return response
}


// create a comment on a post
export const createCommentThunk = (text, userId, postId) => async dispatch => {
    const response = await fetch(`/api/comments/create/${userId}/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
},
        body: JSON.stringify({
            text,
            postId,
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createComment(data))
    }
}

//delete a comment
export const commentDelete = (commentId) => async(dispatch) => {
    const response = await fetch(`/api/comments/delete/${commentId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteComment(data.comment_id))
    }
}


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_COMMENTS:
            action.comments.forEach(comment => {
                return newState[comment.id] = comment;
            });
            return newState;
        case CREATE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default commentReducer;
