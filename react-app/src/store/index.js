import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import userPostsReducer from './post'
import commentReducer from './comments';
import likesReducer from './imglikes';
import followedReducer from './followers';
import followersReducer from './followerstwo';
import getAllFollowedPostReducer from './followedPosts';
import getAllUserFollowedReducer from './userFollowed';
import getAllUserFollowerReducer from './userFollower';
import livechatReducer from './livechatting';
import messageReducer from './messages';
const rootReducer = combineReducers({
  session,
  posts: userPostsReducer,
  comments: commentReducer,
  likes: likesReducer,
  followed: followedReducer,
  followers: followersReducer,
  followedPosts:getAllFollowedPostReducer,
  userSpecificFollowed:getAllUserFollowedReducer,
  userSpecificFollower:getAllUserFollowerReducer,
  livechat: livechatReducer,
  messages: messageReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
