const LOAD_MESSAGES = 'message/LOAD';

const loadMessage = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})


export const allMessages = () => async (dispatch) => {
    const response = await fetch('/api/livechat/messages')

    if (response.ok) {

        const data = await response.json();
        dispatch(loadMessage(data.allMessages))
    }

    return 'sup'
}



const initialState = {};

const messageReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LOAD_MESSAGES:
            action.messages.forEach(el => {
                newState[el.id] = el

            });

            return { ...newState }
        default:
            return { ...newState }

    }

}

export default messageReducer
