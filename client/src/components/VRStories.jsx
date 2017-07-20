import 'aframe';
import 'aframe-mouse-cursor-component';
import { Entity, Scene, Options } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import VRCursor from './VRCursor.jsx';
import VRProfiles from './VRProfiles.jsx';
import mockData from './mockData.js';

class VRStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // THE PROPS BELOW ARE ACTUALLY GETTING DATA FROM AUTH/LOGIN/SESSION!!!
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
      lastClickedFriendIndex: null,

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

  // SINCE USER OF THIS MODULE WILL ONLY PROVIDE LIST OF FRIENDS AND NOT ANY KEYS
  // WE BUILT THIS HELPER FUNCTION TO IDENTIFY EVERY VIDEO TO EACH FRIEND
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

  // THIS IS A HELPER FUNCTION TO SET STATE FOR THE CURRENT INDEX OF STORY (OUT OF ALL STORY BY ONE FRIEND)
  setIndexAndStory(stories, index) {
    return {
      index: index,
      story: stories[index]
    };
  }

  // THIS FUNCTION WILL UPDATE THE STATE OF THE MOST RECENTLY CLICKED FRIEND
  //
  // THIS IS ALSO NECESSARY TO KNOW WHICH FRIEND WAS LAST CLICKED TO KNOW WHEN TO END STORIES LOOP
  // AND TO MAKE THIS FRIEND THE CURRENT STORIES SHOWING
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

  // THIS FUNCTION WILL UPDATE currentStory TO BE THE NEXT STORY
  playNextFriendStory() {
    const { currentStories, currentStory } = this.state;
    let nextStoryIndex = currentStory.index + 1;

    if (nextStoryIndex < currentStories.length) {
      this.setState({
        currentStory: this.setIndexAndStory(currentStories, nextStoryIndex)
      });
    }
  }

  // THIS FUNCTION WILL PLAY THE NEXT STORY OF currentStories AND IF AUTOPLAY IS ON, THE NEXT FRIEND'S STORIES WILL BE PLAYED
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
        <VRProfiles toggle={this.onFriendClick.bind(this)} friends={this.state.friends}/>
          {/*<a-assets>
            <video id="video" crossOrigin="anonymous" src="https://s3-us-west-1.amazonaws.com/vrstories/360+degree+Video-+Pugs+Chompin+down.mp4"
              autoPlay loop></video>
            <img id="story" src="https://s3-us-west-1.amazonaws.com/vrstories/360-panorama-matador-seo.jpg" crossOrigin="anonymous" ></img>
          </a-assets>
          {this.state.background}*/}
        <Entity primitive='a-videosphere' autoPlay loop='false' id='story' src={this.state.currentStory.story.src}/>
        <VRCursor />
      </Scene>
    );
  }
}

export default VRStories;