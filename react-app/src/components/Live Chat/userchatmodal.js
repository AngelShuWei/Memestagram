
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { channelCreate } from '../../store/livechatting';
import './userchatmodal.css';

const UserChatModal = ({ closeModal }) => {



    const [indivChecked, setIndivChecked] = useState([false, -1]);

    const user = useSelector(state => state.session.user);
    const followed = useSelector(state => Object.values(state.followed));
    const channels = useSelector(state => Object.values(state.livechat)).filter(el => el?.user1_id === user?.id);

    let menuRef = useRef();

    const dispatch = useDispatch()

    useEffect(() => {

        const handler = (event) => {

            if (!menuRef.current.contains(event.target)) {

                closeModal(false)
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }


    });

    const handleNext = (e) => {
        e.preventDefault();


        if (channels.filter(el => el?.user2_id === indivChecked[1]).length) {

            closeModal(false)
            return
        } else {


            const payload = {
                'user2Id': indivChecked[1]
            }

            dispatch(channelCreate(payload))
        }

        closeModal(false)


    }

    return (
        <div className='userchatmodalmaindiv'>
            <div ref={menuRef} className='modalContent'>

                <div className='msg-list-top'>
                    <div onClick={() => closeModal(false)} className='closemodal'>
                        <svg aria-label="Close" class="_8-yf5 " color="#262626" fill="#262626" height="18" role="img" viewBox="0 0 48 48" width="18"><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
                    </div>
                    <div className='newmessagep'>
                        New Message
                    </div>
                    {
                        indivChecked[0] ?
                            <button onClick={handleNext} className='nextbutton'>Next</button>
                            : <></>
                    }

                </div>

                <div className='msg-input-main'>
                    <div className='msginputto'>
                        To:
                    </div>
                    <input placeholder='Search...' className='messageinputss' />

                </div>

                <div className='listusers'>
                    {
                        followed.length ?

                            followed.map(el => (
                                <div onClick={() => setIndivChecked((ex) => {

                                    if (el?.id !== ex[1]) {
                                        return [true, el?.id];
                                    } else {
                                        return [!ex[0], el?.id]
                                    }


                                })} key={el?.id} className='indivudualthingies'>
                                    <img className='imgprofilethingies' src={el?.profile_pic} alt='sss'></img>
                                    <div className='nameusernamediv'>
                                        <div className='usernamedivthing'>{el?.username}</div>
                                        <div className='namedivthing'>{el?.name}</div>

                                    </div>

                                    {
                                        indivChecked[0] && indivChecked[1] === el?.id ?
                                            //checked
                                            <button className='listselected'>
                                                <svg aria-label="Toggle selection" class="_8-yf5 " color="#0095f6" fill="#0095f6" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.001.504a11.5 11.5 0 1011.5 11.5 11.513 11.513 0 00-11.5-11.5zm5.706 9.21l-6.5 6.495a1 1 0 01-1.414-.001l-3.5-3.503a1 1 0 111.414-1.414l2.794 2.796L16.293 8.3a1 1 0 011.414 1.415z"></path></svg>
                                            </button> :
                                            //not checked
                                            <button className='listnotselected'>
                                                <svg aria-label="Toggle selection" class="_8-yf5 " color="#0095f6" fill="#0095f6" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12.008" cy="12" fill="none" r="11.25" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"></circle></svg>
                                            </button>
                                    }


                                </div>

                            ))

                            :

                            <div className='listnousers'>
                                Please follow other users or obtain followers to message other users.
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}


export default UserChatModal;
