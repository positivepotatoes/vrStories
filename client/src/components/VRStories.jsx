import React from 'react';
import ReactDOM from 'react-dom';
import { Entity, Scene, Options } from 'aframe-react';
import VRProfiles from './VRProfiles.jsx';
import VRAssets from './VRAssets.jsx';
import VRPrimitive from './VRPrimitive.jsx';
import mockData from './mockData.js';

class VRStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || {},
      friends: props.friends || [],
      autoPlayNext: props.autoPlayNext || false,
      autoPlayStart: props.autoPlayStart || false,
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
      photosInTimeout: null,
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
    this.createAssets();
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

  pauseStories() {
    let stories = Array.prototype.slice.call(document.getElementsByTagName('video'));
    stories.forEach(story => story.pause());
    clearTimeout(this.state.photosInTimeout);
  }

  toggleInEntity() {
    this.setState({
      inEntity: !this.state.inEntity
    });
  }

  setSplashScreen() {
    this.pauseStories();
    this.setState({
      currentStory: this.state.splashScreen
    });
  }

  setAutoPlayOrSplash() {
    if (this.state.autoPlayStart) {
      this.onFriendClick(this.state.friends[0]);
    } else {
      this.setSplashScreen();
    }
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
    let story = document.getElementById(this.state.currentStory.id + ',' + this.state.currentStory.index);
    let that = this;
    this.pauseStories();

    if (this.state.currentStory.type.slice(0, 5) === 'image') {
      this.state.photosInTimeout = setTimeout(function() {
        that.playNext();
      }, this.state.defaultDuration);
    } else {
      story.play();
    }
  }

  // THIS FUNCTION WILL PLAY THE NEXT STORY OF currentStories AND IF AUTOPLAY IS ON, THE NEXT FRIEND'S STORIES WILL BE PLAYED
  // THIS GETS CALLED WHEN VIDEO ENDS PLAYING
  playNext() {
    const { friends, autoPlayNext, currentStories, currentStory, lastClickedFriendIndex, splashScreen } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    let nextFriendIndex = currentStory.id + 1;

    this.playNextStoryOfFriend();

    if (autoPlayNext && nextStoryIndex === currentStories.length) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i) {
          this.setSplashScreen();
        } else {
          this.setState({ 
            currentStories: friends[i].stories,
            currentStory: friends[i].stories[0]
          }, () => this.invokePlay());
        }
      };

      if (nextFriendIndex < friends.length) {
        nextstate(nextFriendIndex);
      } else {
        nextstate(0);
      }
    }
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

  // THIS FUNCTION WILL UPDATE THE STATE OF THE MOST RECENTLY CLICKED FRIEND
  //
  // THIS IS ALSO NECESSARY TO KNOW WHICH FRIEND WAS LAST CLICKED TO KNOW WHEN TO END STORIES LOOP
  // AND TO MAKE THIS FRIEND THE CURRENT STORIES SHOWING
  onFriendClick(friendData) {
    const { currentStory, currentStories, splashScreen } = this.state;

    if (friendData.profile.id === currentStory.id) {
      if ((currentStory.index + 1) === currentStories.length) {
        this.setSplashScreen();
      } else {
        this.playNext();
      }
    } else {
      this.setState({
        lastClickedFriendIndex: friendData.profile.id,
        currentStories: friendData.stories,
        currentStory: friendData.stories[0]
      }, () => this.invokePlay());
    }
  }

  createAssets() {
    let allStories = [];
    this.state.friends.forEach(friend => {
      friend.stories.forEach(story => {
        allStories.push(story);
      });
    });
    let splash = (<img id="-2,-2" key='-2' src={this.props.splashScreen} crossOrigin="anonymous"/>);
    
    let assets = allStories.map((story, i) => {
      let id = story.id + ',' + story.index;
      if (story.type.slice(0, 5) === 'image') {
        return (
          <img id={id} key={i} src={story.src} crossOrigin="anonymous"/>
        );
      } else {
        return (
          <video id={id} key={i} src={story.src} crossOrigin="anonymous" onEnded={() => this.props.playNext()}/>
        );
      }
    });
    assets.push(splash);

    this.props.assetsCallback(assets);
          
    
  }

  render () {
    const { currentStory, friends, user, splashScreen } = this.state;

    return (
      <Entity>
        <VRProfiles
          friends={friends}
          currentStory={currentStory}
          onFriendClick={this.onFriendClick}
          toggleInEntity={this.toggleInEntity}
        />
        <VRPrimitive currentStory={currentStory}/>
      </Entity>
    );
  }
}

export default VRStories;
