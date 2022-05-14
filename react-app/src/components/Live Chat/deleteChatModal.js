import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { channelDelete } from "../../store/livechatting";



const DeleteChatModal = ({ closeModal, deleteChatModal }) => {

    const dispatch = useDispatch();

    const handleDeleteChat = () => {


        dispatch(channelDelete(deleteChatModal));
        closeModal(false);
    }

    let menuRef = useRef();
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

    return (
        <div className='userchatmodalmaindiv'>

            <div ref={menuRef} className="deletemodalmain">
                <div className="topppart">
                    <div className="del-chan-title">
                        Delete Chat?
                    </div>
                    <div className="del-chan-desc">
                        Deleting removes all chat messages for both users. The other user will be notified.
                    </div>

                </div>
                <div onClick={handleDeleteChat} className="middleepart">
                    Delete
                </div>
                <div onClick={()=> closeModal(false)} className="unfollowcancel">
                    Cancel
                </div>
            </div>

        </div>
    )
}


export default DeleteChatModal;
