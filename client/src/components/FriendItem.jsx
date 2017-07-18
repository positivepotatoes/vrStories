import React from 'react';
import { Menu } from 'semantic-ui-react';

const FriendItem = (props) => {
  const handleClick = () => {
    props.onFriendClick(props.friendData, props.friendIndex);
  };

  let playing;
  if (props.currentVideo.profile_id === props.friendData.user.id) {
    playing = `im freakin playing vid ${props.videoIndex + 1} out of ${props.friendData.videos.length} yo!`;
  }

  return (
    <Menu.Item onClick={handleClick}>{props.friendData.user.first}, {playing}</Menu.Item>
  );
};

export default FriendItem;
