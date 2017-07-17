import React from 'react';
import { Menu } from 'semantic-ui-react';

const FriendItem = (props) => {
  let handleClick = e => {
    e.preventDefault();
    props.setFriendState(props.friend);
  };

  return (
    <Menu.Item onClick={handleClick}>{props.friendname}</Menu.Item>
  );
};

export default FriendItem;
