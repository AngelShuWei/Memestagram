import './DirectMessage.css';
import { useDispatch, useSelector } from 'react-redux';

function DirectMessage() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    // <>
      <div className='message-box-container'>
        <div className='message-box-content'>
          <div className='message-left-container'>
            <div>{sessionUser.username}</div>
            <div><i className="fa-lg fa-solid fa-pen-to-square"/></div>
          </div>
          <div className='message-right-container'>
          </div>
        </div>
      </div>
    // </>
  );
};

export default DirectMessage;
