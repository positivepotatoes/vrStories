import 'aframe';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import VRCursor from './VRCursor.jsx';
import VRProfiles from './VRProfiles.jsx';
import mockData from './mockData.js';
// ASK TEAM IF WE CAN DELETE THIS DEPENDENCY BELOW
// import 'aframe-particle-system-component';

class VRIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // THE PROPS BELOW ARE ACTUALLY GETTING DATA FROM AUTH/LOGIN/SESSION!!!
      user: props.user,
      friends: props.friends,
      autoPlayStart: props.autoPlayStart,
      autoPlayNext: props.autoPlayNext,

      // USE THESE PROPS INSTEAD IF YOU WANT TO USE MOCK DATA WHICH ALSO HAS PICTURE URL
      // friends: mockData.friends,
      // user: mockData.user,
      toggle: true,
      background: <a-videosphere src="#video" rotation="0 -90 0"></a-videosphere>
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

  // SINCE USER OF THIS MODULE WILL ONLY PROVIDE LIST OF DATA
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

  toggle () {
    console.log(this.state.friends);
    console.log('toggle!');
    if (!this.state.toggle) {
      this.setState({
        background: (<a-videosphere src="#story"></a-videosphere>)
      });
    } else {
      this.setState({
        background: (<a-sky src="#video" rotation="0 -90 0"></a-sky>)
      });
    }
    this.setState({
      toggle: !this.state.toggle
    });
  }



  render () {
    return (
      <Scene>
        <VRProfiles toggle={this.toggle.bind(this)} friends={this.state.friends}/>
        <a-assets>
          <video id="video" crossOrigin="anonymous" src="https://s3-us-west-1.amazonaws.com/vrstories/360+degree+Video-+Pugs+Chompin+down.mp4"
            autoPlay loop></video>
          <img id="story" src="https://s3-us-west-1.amazonaws.com/vrstories/360-panorama-matador-seo.jpg" crossOrigin="anonymous" ></img>
        </a-assets>
        {this.state.background}
        <VRCursor />
      </Scene>
    );
  }
}

export default VRIndex;