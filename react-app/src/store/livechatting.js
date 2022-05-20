const LOAD_CHANNELS = 'channel/LOAD';
const CREATE_CHANNEL = 'channel/CREATE';
const DELETE_CHANNEL = 'channel/DELETE';
const CREATE_MESSAGES = 'message/CREATE';


const loadChannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
})


const createChannel = (channel) => ({
    type: CREATE_CHANNEL,
    channel
})

const createMessage = (message) => ({
    type: CREATE_MESSAGES,
    message
})

const deleteChannel = (id) => ({
    type: DELETE_CHANNEL,
    id
})


export const allChannels = () => async (dispatch) => {
    const response = await fetch('/api/livechat/channels');

    if (response.ok) {

        const data = await response.json();
        dispatch(loadChannels(data.allChannels))
    }

    return 'sup'
}



export const channelCreate = (payload) => async (dispatch) => {
    const response = await fetch('/api/livechat/channels/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(createChannel(data));
    }

    return 'sup'

}

export const messageCreate = (payload) => async (dispatch) => {
    const response = await fetch('/api/livechat/messages/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(createMessage(data));
        dispatch(allChannels())

    }

    return 'sup'

}


export const channelDelete = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/livechat/channels/delete/${channelId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(deleteChannel(data.id));
    }
    return 'asdhkjajdhaslabn'
}





const initialState = {};

const livechatReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LOAD_CHANNELS:
            action.channels.forEach(el => {
                newState[el.id] = el
                newState[el.id].messages = [...el.messages]
            });

            return { ...newState }
        case DELETE_CHANNEL:
            delete newState[action.id]
            return { ...newState }

        case CREATE_CHANNEL:
            newState[action.channel.id] = action.channel
            return { ...newState }

        case CREATE_MESSAGES:
            newState[action.message.id] = action.message;
            return { ...newState }
        default:
            return { ...newState }

    }

}

export default livechatReducer
