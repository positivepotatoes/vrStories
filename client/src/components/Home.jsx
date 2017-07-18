import React from 'react';
import axios from 'axios';
import VRFrame from './VRFrame.jsx';
import Dropzone from 'react-dropzone';
import { Menu } from 'semantic-ui-react';
import FriendList from './FriendList.jsx';
import MediaFrame from './MediaFrame.jsx';
import UploadButton from './UploadButton.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentFriend: {},
      friends:
      [
        {
          user: {
            id: 1,
            first: 'David',
            last: 'Oh',
            display: 'David Oh'
          },
          videos: [{ type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329882921', profile_id: 1 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329895280', profile_id: 1 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329900922', profile_id: 1 }]
        }, {
          user: {
            id: 2,
            first: 'Alex',
            last: 'S',
            display: 'Alex S.'
          },
          videos: [{ type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329906346', profile_id: 2 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329911740', profile_id: 2 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329915531', profile_id: 2 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329906346', profile_id: 2 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329911740', profile_id: 2 }, ]
        }, {
          user: {
            id: 3,
            first: 'Anna',
            last: 'Anna',
            display: 'Anna Anna'
          },
          videos: [{ type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329882921', profile_id: 3 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329895280', profile_id: 3 }, { type: 'video/mp4', aws_link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500329900922', profile_id: 3 }]
        },
      ],

      videoIndex: 0,
      currentVideo: {},
      currentVideos: [],

      autoplay: false,
      friendIndex: 0,
      lastClickedFriendIndex: 0,
      

      accept: '',
      files: [],
      dropzoneActive: false
    };
    this.fetch = this.fetch.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
    this.playNextOrStop = this.playNextOrStop.bind(this);
    this.onMediaClick = this.onMediaClick.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  fetch() {
    axios.get('/fetch')
      .then(response => {
        this.setState({
          user: response.data.user
        });
      });
  }

  onFriendClick(friendData, friendIndex) {
    console.log('onFriendClicked, index: ', friendData.user.first, ', ', friendIndex);

    this.setState({
      friendIndex,
      videoIndex: 0,
      currentVideos: friendData.videos,
      currentVideo: friendData.videos[0],
      lastClickedFriendIndex: friendIndex,
    });
  }

  onMediaClick() {
    this.playNextOrStop();
  }

  playNextOrStop() {
    const { friends, videoIndex, friendIndex, currentVideos, autoplay, currentVideo, lastClickedFriendIndex } = this.state;
    let nextVideoIndex = videoIndex + 1;
    let nextFriendIndex = friendIndex + 1;

    if (nextVideoIndex < currentVideos.length) {
      this.setState({
        currentVideo: currentVideos[nextVideoIndex],
        videoIndex: nextVideoIndex,
      });
    } else if (autoplay) {
      if (nextFriendIndex === lastClickedFriendIndex) {
        return;
      }

      if (nextFriendIndex < friends.length) {
        this.setState({
          videoIndex: 0,
          friendIndex: nextFriendIndex,
          currentVideos: friends[nextFriendIndex].videos,
          currentVideo: friends[nextFriendIndex].videos[0]
        });
      } else {
        if (lastClickedFriendIndex === 0) {
          return;
        }

        this.setState({
          videoIndex: 0,
          friendIndex: 0,
          currentVideos: friends[0].videos,
          currentVideo: friends[0].videos[0]
        });
      }
    } 
  }

  // Functions below are used for react file dropzone
  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    console.log('acceptedFiles:', files);
    let formData = new FormData();
    formData.append('file', files[0]);
    formData.append('userId', this.state.user.id);
    axios.post('/api/upload', formData);
    this.setState({
      files,
      dropzoneActive: false
    });
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }

  render() {
    const { currentVideo, videoIndex, user, friends, accept, files, dropzoneActive } = this.state;

    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };

    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }

        <div>
          Welcome Home {user.first}!
          <UploadButton />
          <FriendList friends={friends} onFriendClick={this.onFriendClick} currentVideo={currentVideo} videoIndex={videoIndex}/>
          <MediaFrame currentVideo={currentVideo} playNextOrStop={this.playNextOrStop} onMediaClick={this.onMediaClick}/>
        </div>
      </Dropzone>
    );
  }
}

export default Home;
