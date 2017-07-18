import React from 'react';
import { Menu, Progress, Segment } from 'semantic-ui-react';

const FriendItem = (props) => {
  const handleClick = () => {
    props.onFriendClick(props.friendData, props.friendIndex);
  };

  let playing;
  if (props.currentVideo.profile_id === props.friendData.user.id) {
    playing = <Progress percent={(props.videoIndex + 1) / (props.friendData.videos.length) * 100} attached='bottom'/>;
  }

  return (
    <div>
      <Menu.Item onClick={handleClick}>
        {props.friendData.user.first} 
        {playing}
      </Menu.Item>
    </div>
  );
};

export default FriendItem;
