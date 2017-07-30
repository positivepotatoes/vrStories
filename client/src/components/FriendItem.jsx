import React from 'react';
import { Button, Progress, Menu } from 'semantic-ui-react';

const FriendItem = (props) => {

  let progressIndicator;
  if (props.currentStory.story.id === props.friendData.profile.id) {
    progressIndicator = <Progress percent={(props.currentStory.index + 1) / (props.friendData.stories.length) * 100} attached='bottom'/>;
  }

  return (
    <Menu.Item onClick={() => props.onFriendClick(props.friendData, props.friendIndex)}>
      {props.friendData.profile.first} 
      {progressIndicator}
    </Menu.Item>
    
  );
};

export default FriendItem;
