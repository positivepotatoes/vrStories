import React from 'react';
import FriendList from './FriendList.jsx';

class MediaFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      friends: props.friends,
      autoplay: props.autoplay,
      
      currentStory: {
        story: {},
        index: 0
      },

      currentStories: [],
      friendIndex: 0,
      lastClickedFriendIndex: 0
    };
    this.play = this.play.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
  }

  setVideoAndIndex(stories, index) {
    return {
      index: index,
      story: stories[index]
    };
  }

  onFriendClick(friendData, friendIndex) {
    this.setState({
      friendIndex,
      lastClickedFriendIndex: friendIndex,
      currentStories: friendData.stories,
      currentStory: this.setVideoAndIndex(friendData.stories, 0)
    });
  }

  playFriendVideos() {
    const { currentStories, currentStory } = this.state;
    let nextStoryIndex = currentStory.index + 1;

    if (nextStoryIndex < currentStories.length) {
      this.setState({
        currentStory: this.setVideoAndIndex(currentStories, nextStoryIndex)
      });
    }
  }

  play() {
    const { autoplay, friends, friendIndex, currentStories, currentStory, lastClickedFriendIndex } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    let nextFriendIndex = friendIndex + 1;

    this.playFriendVideos();

    if (autoplay && nextStoryIndex === currentStories.length) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i) {
          return;
        }
        this.setState({ 
          friendIndex: i,
          currentStories: friends[i].stories,
          currentStory: this.setVideoAndIndex(friends[i].stories, 0)
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
    const { currentStory, friends } = this.state;

    return (
      <div>
        <FriendList
          friends={friends}
          currentStory={currentStory}
          onFriendClick={this.onFriendClick}
        />
        <video width="400"
          autoPlay
          onClick={this.play}
          onEnded={this.play}
          src={currentStory.story.aws_link}
        />
      </div>
    );
  }

}

export default MediaFrame;