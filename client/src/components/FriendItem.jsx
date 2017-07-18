import React from 'react';
import { Menu, Progress, Segment } from 'semantic-ui-react';

const FriendItem = (props) => {

  let progressIndicator;
  if (props.currentStory.story.profile_id === props.friendData.profile.id) {
    progressIndicator = <Progress percent={(props.currentStory.index + 1) / (props.friendData.stories.length) * 100} attached='bottom'/>;
  }

  return (
    <div>
      <Menu.Item onClick={() => props.onFriendClick(props.friendData, props.friendIndex)}>
        {props.friendData.profile.first} 
        {progressIndicator}
      </Menu.Item>
    </div>
  );
};

export default FriendItem;
