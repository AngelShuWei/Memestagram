import { useEffect, useRef, useState } from "react"



const EditDeleteCommentModal = ({closeModal2, commentIdd,updateModalSomeStuff,deleteModalSomeStuff}) =>{

    let menuRef = useRef()

    useEffect(() => {
        const handler = (event) => {
            if (!menuRef.current.contains(event.target)) {

                closeModal2(false);
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });
    const handleDeleteModal = () => {
        deleteModalSomeStuff([true,commentIdd])
    }
    const handleUpdateModal = () => {

        updateModalSomeStuff([true,commentIdd])
    }

    return (
        <div className='background-modal'>
            <div ref={menuRef} className="modal-container-edit-delete-post">
                <div className="edit-delete-post-modal-divs navlink-delete" onClick={handleDeleteModal} >
                    <button className="navlink-delete" >Delete Comment</button>
                </div>
                <div className="edit-delete-post-modal-divs edit-caption" onClick={handleUpdateModal} >
                    <button className="navlink-update">Edit Comment</button>

                </div>
                <div className="edit-delete-post-modal-divs" onClick={() => closeModal2(false)}>
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default EditDeleteCommentModal
