import React from 'react';
import FriendItem from './FriendItem.jsx';

const FriendList = (props) => (
  <div>
    {
      props.friends.map((friend, i) => {
        return <FriendItem 
          key={i}
          friendIndex={i} 
          friendData={friend}
          onFriendClick={props.onFriendClick} 
          currentStory={props.currentStory} 
        />;
      })
    }
  </div>
);

export default FriendList;
