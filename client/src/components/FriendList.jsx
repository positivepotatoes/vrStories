import React from 'react';
import FriendItem from './FriendItem.jsx';
import { Button, Menu } from 'semantic-ui-react';

const FriendList = (props) => (
  <Menu fluid vertical>
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
  </Menu>
);

export default FriendList;
