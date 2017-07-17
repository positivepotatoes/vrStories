import React from 'react';
import FriendItem from './FriendItem.jsx';

const FriendList = (props) => (
  <div>
    {
      props.friends.map((friend, i) => {
        return <FriendItem key={i} friendData={friend} onFriendClick={props.onFriendClick} currentVideo={props.currentVideo}/>;
      })
    }
  </div>
);

export default FriendList;
