import React from 'react';
import FriendList from './FriendList.jsx';
import VRFrame from './VRFrame.jsx';
import VRIndex from './VRIndex.jsx';
import { Button, Grid } from 'semantic-ui-react';

class MediaFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      friends: props.friends,
      autoPlayStart: props.autoPlayStart,
      autoPlayNext: props.autoPlayNext,
      
      currentStory: {
        story: {
          src: ''
        },
        index: 0
      },

      currentStories: [],
      friendIndex: null,
      lastClickedFriendIndex: null
    };
    this.playNext = this.playNext.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
  }
  
  componentWillMount() {
    this.setId(this.props.user);
    this.setId(this.props.friends);
    if (this.state.autoPlayStart) {
      this.onFriendClick(this.state.friends[0], 0);
    }
  }

  setId(data) {
    if (Array.isArray(data)) {
      data.forEach((user, i) => {
        user.profile.id = i + 1;
        user.stories.forEach(story => story.id = i + 1);
      });
    } else {
      data.profile.id = 0;
      data.stories.forEach(story => story.id = 0);
    }
  }

  setIndexAndStory(stories, index) {
    return {
      index: index,
      story: stories[index]
    };
  }

  onFriendClick(friendData, friendIndex) {
    if (friendIndex === this.state.friendIndex) {
      this.playNextFriendStory();
      return;
    }

    this.setState({
      friendIndex,
      lastClickedFriendIndex: friendIndex,
      currentStories: friendData.stories,
      currentStory: this.setIndexAndStory(friendData.stories, 0)
    });
  }

  playNextFriendStory() {
    const { currentStories, currentStory } = this.state;
    let nextStoryIndex = currentStory.index + 1;

    if (nextStoryIndex < currentStories.length) {
      this.setState({
        currentStory: this.setIndexAndStory(currentStories, nextStoryIndex)
      });
    }
  }

  playNext() {
    const { friends, autoPlayNext, friendIndex, currentStories, currentStory, lastClickedFriendIndex } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    let nextFriendIndex = friendIndex + 1;

    this.playNextFriendStory();

    if (autoPlayNext && nextStoryIndex === currentStories.length) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i) {
          return;
        }
        this.setState({ 
          friendIndex: i,
          currentStories: friends[i].stories,
          currentStory: this.setIndexAndStory(friends[i].stories, 0)
        });
      };

      if (nextFriendIndex < friends.length) {
        nextstate(nextFriendIndex);
      } else {
        nextstate(0);
      }
    } 
  }

  render() {
    const { friends, currentStory } = this.state;

    return (
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column width={2}>
            <FriendList
              friends={friends}
              currentStory={currentStory}
              onFriendClick={this.onFriendClick}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            {/*<video width="900"
              autoPlay
              onClick={this.playNext}
              onEnded={this.playNext}
              src={currentStory.story.src}
            />*/}
            {/*<VRFrame currentStory={currentStory} onClick={this.playNext} className='abc'/>*/}
            <VRIndex/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}

export default MediaFrame;