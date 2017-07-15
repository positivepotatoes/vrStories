import React from 'react';
import FriendItem from './FriendItem.jsx';

const FriendList = (props) => (
  <div>
    {
      props.friends.map((friend, i) => {
        return <FriendItem key={i} friend_id={friend.user.id} friend={friend.user.first}/>;
      })
    }
  </div>
);

export default FriendList;
