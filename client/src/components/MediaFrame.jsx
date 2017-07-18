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

    this.onFriendClick = this.onFriendClick.bind(this);
    this.playNextOrStop = this.playNextOrStop.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this);
  }

  onFriendClick(friendData, friendIndex) {
    this.setState({
      friendIndex,
      lastClickedFriendIndex: friendIndex,
      currentVideos: friendData.videos,
      currentVideo: {
        index: 0,
        video: friendData.videos[0]
      },
    });
  }

  playNextOrStop() {
    const { autoplay, friends, friendIndex, currentVideos, currentVideo, lastClickedFriendIndex } = this.state;
    let nextVideoIndex = currentVideo.index + 1;
    let nextFriendIndex = friendIndex + 1;

    
    if (nextVideoIndex < currentVideos.length) {
      this.setState({
        currentVideo: {
          index: nextVideoIndex,
          video: currentVideos[nextVideoIndex]
        }
      });
    } else if (autoplay) {

      if (nextFriendIndex === lastClickedFriendIndex) {
        return;
      }

      if (nextFriendIndex < friends.length) {
        this.setState({
          currentVideo: {
            index: 0,
            video: friends[nextFriendIndex].videos[0]
          },

          friendIndex: nextFriendIndex,
          currentVideos: friends[nextFriendIndex].videos,
        });
      } else {
        if (lastClickedFriendIndex === 0) {
          return;
        }

        this.setState({
          
          friendIndex: 0,
          currentVideos: friends[0].videos,
          currentVideo: {
            video: friends[0].videos[0],
            index: 0
          }
        });
      }
    } 
  }

  onVideoEnd() {
    this.playNextOrStop();
  }

  render() {
    const { currentVideo, videoIndex, user, friends, accept, files, dropzoneActive } = this.state;


    return (
      <div>
        <FriendList 
          friends={friends} 
          onFriendClick={this.onFriendClick} 
          currentVideo={currentVideo.video} 
          videoIndex={currentVideo.index}
        />
        <video width="400" autoPlay onClick={this.playNextOrStop} onEnded={this.onVideoEnd} src={currentVideo.video.aws_link} >
        </video>
      </div>
    );
  }

}

export default MediaFrame;