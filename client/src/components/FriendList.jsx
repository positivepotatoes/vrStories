import React from 'react';
import FriendItem from './FriendItem.jsx';

const FriendList = (props) => (
  <div>
    {
      props.friends.map((friend, i) => {
        friend.index = i;
        return <FriendItem key={i} setFriendState={props.setFriendState} friend_id={friend.user.id} friendname={friend.user.first} friend={friend}/>;
      })
    }
  </div>
);

export default FriendList;
