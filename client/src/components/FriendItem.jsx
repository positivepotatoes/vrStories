import React from 'react';
import { Menu, Progress, Segment } from 'semantic-ui-react';

const FriendItem = (props) => {

  let progressIndicator;
  if (props.currentVideo.video.profile_id === props.friendData.user.id) {
    progressIndicator = <Progress percent={(props.currentVideo.index + 1) / (props.friendData.videos.length) * 100} attached='bottom'/>;
  }

  return (
    <div>
      <Menu.Item onClick={() => props.onFriendClick(props.friendData, props.friendIndex)}>
        {props.friendData.user.first} 
        {progressIndicator}
      </Menu.Item>
    </div>
  );
};

export default FriendItem;
