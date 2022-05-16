import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { allChannels, messageCreate } from '../../store/livechatting';
import './livechatpage.css'
import UserChatModal from './userchatmodal';
import Picker from 'emoji-picker-react';
import DeleteChatModal from './deleteChatModal';
import { getAllTheUsers } from '../../store/session';
import { getAllUserFollowed } from '../../store/userFollowed';
import { getAllUserFollowers } from '../../store/userFollower';

const LiveChat = () => {

    const [userChatModal, setUserchatmodal] = useState(false);
    const [active, setActive] = useState([false, -1]);
    const [message, setMessage] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [deleteChatModal, setDeleteChatModal] = useState([false, -1])

    const followed = useSelector(state => state.followed);

    const users = useSelector(state => Object.values(state.session));
    const user = useSelector(state => state.session.user);
    const channels = useSelector(state => Object.values(state.livechat)).filter(el => el?.user2_id === user?.id
        || el?.user1_id === user?.id);
    const channel = channels.filter(el => (el?.user1_id === user?.id && el?.user2_id === active[1]) ||
        (el?.user2_id === user?.id && el?.user1_id === active[1]))[0]
    const user2 = users.find(user => user?.id === active[1]) //gives user2 id and information

    const dispatch = useDispatch()

    const emojiClick = (e, emojiObject) => {
        setMessage(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const handleMessageSubmit = (e, channelId) => {
        e.preventDefault();

    const payload = {
          channelId,
          'senderId': user?.id,
          'recieverId': active[1],
          'content': message
     }
      dispatch(messageCreate(payload));
      setMessage('');
     }

    useEffect(() => {
        dispatch(getAllUserFollowed(user?.id));
        dispatch(allChannels());
    }, [dispatch, followed])



    return (
        <>

            <div className="livechatpagemaindiv">

                <div className='livechattable'>

                    <div className='leftchannel'>
                        <div className='top-leftthingy'>
                            <div className='nametopleft'>{user?.username}</div>
                            <div style={{ marginLeft: "auto", cursor: "pointer" }}>
                                <svg onClick={() => setUserchatmodal(true)} aria-label="New Message" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 44 44" width="24"><path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path><path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path><path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path></svg>
                            </div>
                        </div>
                        <div className='bottom-leftthingy'>
                            {channels.map(el => {

                                if (el?.user1_id === user?.id) {

                                    return (
                                        <div onClick={() => setActive([true, el?.user?.id])} className='userlivechatcard' key={el?.id}>
                                            <img className='userlivecharcardimg' src={el?.user?.profile_pic} alt='blahh'></img>
                                            <div className='userlivechatcarusername'>{el?.user?.username}</div>
                                        </div>
                                    )
                                } else if (el?.user2_id === user?.id) {
                                    let user3 = users.filter(el3 => el3?.id === el?.user1_id)[0];
                                    return (
                                        <div onClick={() => setActive([true, user3?.id])} className='userlivechatcard' key={el?.id}>
                                            <img className='userlivecharcardimg' src={user3?.profile_pic} alt='blahh'></img>
                                            <div className='userlivechatcarusername'>{user3?.username}</div>
                                        </div>
                                    )
                                }

                            })}
                        </div>

                    </div>

                    {
                        active[0] ?

                            <div className='rightchannel'>
                                <div className='toprightthingy'>
                                    <img className='profileimg' src={user2?.profile_pic} alt='something'></img>
                                    <NavLink className={'somethingaswell'} exact to={'/'}>{user2?.username}</NavLink>
                                    <img className='xicon' onClick={(e) => setDeleteChatModal([true, channel?.id])} src='https://img.icons8.com/material-rounded/24/000000/delete-sign.png' alt='xthingy'></img>
                                </div>
                                <div className='messagediv'>
                                    <div className='channelmsg-inner'>
                                        {channel?.messages.map(ele => {
                                            return (
                                                <div className={ele?.senderId === user?.id ? 'channel-msg-right' : 'channel-msg-left'} key={ele?.id}>
                                                    {/* {ele?.senderId !== user?.id && <img className='msg-left-img' src={channel?.user?.profile_pic} alt='st'></img>} */}
                                                    <div className={ele?.senderId === user?.id ? 'msg-content-right' : 'msg-content'}>
                                                        {ele?.content}
                                                        <br></br>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className='messageinput'>

                                    <div className='msg-box'>
                                        <div className='emojis'>
                                            <img
                                                className="adding-emoji-post"
                                                src={'https://img.icons8.com/ios/50/000000/smiling.png'}
                                                onClick={() => setShowPicker(val => !val)} />
                                                {showPicker && <Picker
                                                pickerStyle={{ width: '300px' }}
                                                onEmojiClick={emojiClick} />}
                                        </div>
                                        <textarea onChange={(e) => setMessage(e.target.value)} value={message} className='textareainputmessage'></textarea>
                                        <button onClick={(e) => handleMessageSubmit(e, channel?.id)} className='sendbuttonmessage'>Send</button>
                                    </div>

                                </div>
                            </div>
                            :

                            <div className='no-channel'>
                                <img className='nochannelimg' src='https://i.imgur.com/XPOUlZK.png' alt='asd'></img>
                                <div className='no-msgs'>Your Messages</div>
                                <div className='no-msgs-desc'>Send private messages to a friend.</div>
                                <button onClick={() => setUserchatmodal(true)} className='no-channel-button'>Send Message</button>
                            </div>

                    }

                </div>
            </div>
            {userChatModal &&
                <UserChatModal closeModal={setUserchatmodal} />
            }
            {deleteChatModal[0] &&
                <DeleteChatModal closeModal={setDeleteChatModal} deleteChatModal={channel?.id} />

            }
        </>
    )
}


export default LiveChat
