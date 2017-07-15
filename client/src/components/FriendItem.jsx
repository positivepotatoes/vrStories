import React from 'react';
import { Menu } from 'semantic-ui-react';

const FriendItem = (props) => (
  <Menu.Item onClick={() => console.log('you onClicked me! but I have not been set up yet :)')}>{props.friend}</Menu.Item>
);

export default FriendItem;
