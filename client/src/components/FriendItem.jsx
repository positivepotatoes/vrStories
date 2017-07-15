import React from 'react';
import { Menu } from 'semantic-ui-react';

const FriendItem = (props) => (
  <Menu.Item color='blue' onClick={() => console.log('you onClicked me! but I have not been set up yet :)')}>{props.friend.name}</Menu.Item>
);

export default FriendItem;
