import React from 'react';
import FriendItem from './FriendItem.jsx';

const FriendList = (props) => (
  <div>
    {
      props.friends.map((friend, i) => <FriendItem key={i} friend={friend}/>)
    }
  </div>
);

export default FriendList;
