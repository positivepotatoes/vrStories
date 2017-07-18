import React from 'react';
import FriendList from './FriendList.jsx';

class MediaFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      friends: props.friends,
      autoplay: props.autoplay,
      
      currentVideo: {
        video: {},
        index: 0
      },

      currentVideos: [],
      friendIndex: 0,
      lastClickedFriendIndex: 0
    };
    this.play = this.play.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
  }

  setVideoAndIndex(videos, index) {
    return {
      index: index,
      video: videos[index]
    };
  }

  onFriendClick(friendData, friendIndex) {
    this.setState({
      friendIndex,
      lastClickedFriendIndex: friendIndex,
      currentVideos: friendData.videos,
      currentVideo: this.setVideoAndIndex(friendData.videos, 0)
    });
  }

  playFriendVideos() {
    const { currentVideos, currentVideo } = this.state;
    let nextVideoIndex = currentVideo.index + 1;

    if (nextVideoIndex < currentVideos.length) {
      this.setState({
        currentVideo: this.setVideoAndIndex(currentVideos, nextVideoIndex)
      });
    }
  }

  play() {
    const { autoplay, friends, friendIndex, currentVideos, currentVideo, lastClickedFriendIndex } = this.state;
    let nextVideoIndex = currentVideo.index + 1;
    let nextFriendIndex = friendIndex + 1;

    this.playFriendVideos();

    if (autoplay && nextVideoIndex === currentVideos.length) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i) {
          return;
        }
        this.setState({ 
          friendIndex: i,
          currentVideos: friends[i].videos,
          currentVideo: this.setVideoAndIndex(friends[i].videos, 0)
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
    const { currentVideo, friends } = this.state;

    return (
      <div>
        <FriendList 
          friends={friends} 
          currentVideo={currentVideo}
          onFriendClick={this.onFriendClick} 
        />
        <video width="400"
          autoPlay 
          onClick={this.play} 
          onEnded={this.play} 
          src={currentVideo.video.aws_link}
        />
      </div>
    );
  }

}

export default MediaFrame;