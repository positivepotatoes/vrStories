import 'aframe';
import 'aframe-mouse-cursor-component';
import { Entity, Scene, Options } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import VRProfiles from './VRProfiles.jsx';
import VRAssets from './VRAssets.jsx';
import VRPrimitive from './VRPrimitive.jsx';
import mockData from './mockData.js';

class VRStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      friends: props.friends,
      autoPlayNext: props.autoPlayNext,
      autoPlayStart: props.autoPlayStart,
      defaultDuration: props.defaultDuration || 7000,
      splashScreen: {
        id: -2,
        index: -2,
        type: 'image',
        src: props.splashScreen,
      },

      inEntity: false,
      currentStory: {},
      currentStories: [],
      lastClickedFriendIndex: null,
      // USE FOR MOCK DATA
      // friends: mockData.friends,
      // user: mockData.user,
    };
    this.playNext = this.playNext.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
    this.toggleInEntity = this.toggleInEntity.bind(this);
  }

  componentWillMount() {
    this.setId(this.state.friends);
    this.setId([this.state.user], true);
    this.setAutoPlayOrSplash();
    this.clickInSkyListener();
  }

  // SINCE USER OF THIS MODULE WILL ONLY PROVIDE LIST OF FRIENDS AND NOT ANY KEYS
  // WE BUILT THIS HELPER FUNCTION TO IDENTIFY EVERY VIDEO TO EACH FRIEND
  setId(data, isUser = false) {
    data.forEach((user, i) => {
      if (isUser) { i = -1; }
      user.profile.id = i;
      user.stories.forEach((story, j) => {
        story.id = i;
        story.index = j;
      });
    });
  }

  setAutoPlayOrSplash() {
    if (this.state.autoPlayStart) {
      this.onFriendClick(this.state.friends[0]);
    } else {
      this.setState({
        currentStory: this.state.splashScreen
      });
    }
  }

  toggleInEntity() {
    this.setState({
      inEntity: !this.state.inEntity
    });
  }

  clickInSkyListener() {
    document.body.addEventListener('click', () => {
      if (!this.state.inEntity && (this.state.currentStory.id !== -2)) {
        this.playNext();
      }
    });
  }

  // THIS NEEDS TO BE INVOKED EVERYTIME THE STATE OF THE CURRENT STORY IS CHANGED
  invokePlay() {
    let that = this;
    const pauseVideo = () => {
      let stories = Array.prototype.slice.call(document.getElementsByTagName('video'));
      stories.forEach(story => story.pause());
    };

    if (this.state.currentStory.type.slice(0, 5) === 'image') {
      pauseVideo();
      setTimeout(function() {
        that.playNext();
      }, this.state.defaultDuration);
    } else {
      let story = document.getElementById(this.state.currentStory.id + ',' + this.state.currentStory.index);
      pauseVideo();
      story.play();
    }
  }

  // THIS FUNCTION WILL UPDATE THE STATE OF THE MOST RECENTLY CLICKED FRIEND
  //
  // THIS IS ALSO NECESSARY TO KNOW WHICH FRIEND WAS LAST CLICKED TO KNOW WHEN TO END STORIES LOOP
  // AND TO MAKE THIS FRIEND THE CURRENT STORIES SHOWING
  onFriendClick(friendData) {
    if (friendData.profile.id === this.state.currentStory.id) {
      if ((this.state.currentStory.index + 1) === this.state.currentStories.length) {
        this.setState({
          currentStory: this.state.splashScreen
        }, () => this.invokePlay());
        return;
      } else {
        this.playNextStoryOfFriend();
        return;
      }
    }

    this.setState({
      lastClickedFriendIndex: friendData.profile.id,
      currentStories: friendData.stories,
      currentStory: friendData.stories[0]
    }, () => this.invokePlay());

  }

  // THIS FUNCTION WILL UPDATE currentStory TO BE THE NEXT STORY
  playNextStoryOfFriend() {
    const { currentStories, currentStory } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    
    if (nextStoryIndex < currentStories.length) {
      this.setState({
        currentStory: currentStories[nextStoryIndex]
      }, () => this.invokePlay());
    }
  }

  // THIS FUNCTION WILL PLAY THE NEXT STORY OF currentStories AND IF AUTOPLAY IS ON, THE NEXT FRIEND'S STORIES WILL BE PLAYED
  // THIS GETS CALLED WHEN VIDEO ENDS PLAYING
  playNext() {
    const { friends, autoPlayNext, currentStories, currentStory, lastClickedFriendIndex } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    let nextFriendIndex = currentStory.id + 1;

    this.playNextStoryOfFriend();

    if (autoPlayNext && nextStoryIndex === currentStories.length) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i) {
          return;
        }

        this.setState({ 
          currentStories: friends[i].stories,
          currentStory: friends[i].stories[0]
        }, () => this.invokePlay());
      };

      
      if (nextFriendIndex < friends.length) {
        nextstate(nextFriendIndex);
      } else {
        nextstate(0);
      }
      
    }
  }
  

  render () {
    const { currentStory, friends, user, splashScreen } = this.state;

    return (
      <Scene>
        <VRProfiles
          friends={friends}
          currentStory={currentStory}
          onFriendClick={this.onFriendClick}
          toggleInEntity={this.toggleInEntity}
        />
        <VRAssets user={user} friends={friends} playNext={this.playNext} splashScreen={splashScreen}/>
        <VRPrimitive currentStory={currentStory}/>
        {this.props.VRCursor}
      </Scene>
    );
  }
}

export default VRStories;
