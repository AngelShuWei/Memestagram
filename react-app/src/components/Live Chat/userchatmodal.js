
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './userchatmodal.css';

const UserChatModal = () => {


    const followed = useSelector(state => Object.values(state.followed));
    const [indivChecked, setIndivChecked] = useState([false, -1]);

    return (
        <div className='userchatmodalmaindiv'>
            <div className='modalContent'>

                <div className='msg-list-top'>
                    <div className='closemodal'>
                        <svg aria-label="Close" class="_8-yf5 " color="#262626" fill="#262626" height="18" role="img" viewBox="0 0 48 48" width="18"><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
                    </div>
                    <div className='newmessagep'>
                        New Message
                    </div>
                    <button className='nextbutton'>Next</button>

                </div>

                <div className='msg-input-main'>
                    <div className='msginputto'>
                        To:
                    </div>
                    <input placeholder='Search...' className='messageinputss' />

                </div>

                <div className='listusers'>
                    {followed.map(el => (
                        <div key={el?.id} className='indivudualthingies'>
                            <img className='imgprofilethingies' src={el?.profile_pic} alt='sss'></img>
                            <div className='nameusernamediv'>
                                <div className='usernamedivthing'>{el?.username}</div>
                                <div className='namedivthing'>{el?.name}</div>

                            </div>

                            {
                                indivChecked[0] && indivChecked[1] === el?.id ?
                                    <button className='listnotselected2'>
                                        <svg aria-label="Toggle selection" class="_8-yf5 " color="#0095f6" fill="#0095f6" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M24 0C10.8 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0zm13.3 16.9L21 33.3c-.3.3-.7.4-1.1.4-.4 0-.8-.2-1.1-.4l-8.2-8.2c-.6-.6-.6-1.6 0-2.2.6-.6 1.6-.6 2.2 0l7.1 7.1 15.3-15.3c.6-.6 1.6-.6 2.2 0 .5.6.5 1.6-.1 2.2z"></path></svg>
                                    </button> :
                                    <button onClick={() => setIndivChecked([true,el?.id])} className='listnotselected'>
                                        <svg aria-label="Toggle selection" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12.008" cy="12" fill="none" r="11.25" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"></circle></svg>
                                    </button>
                            }


                        </div>

                    ))}
                </div>

            </div>
        </div>
    )
}


export default UserChatModal;
