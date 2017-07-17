import React from 'react';
import axios from 'axios';
import Upload from './Upload.jsx';
import Dropzone from 'react-dropzone';
import UploadButton from './UploadButton.jsx';
import FriendList from './FriendList.jsx';
import VRFrame from './VRFrame.jsx';
import MediaFrame from './MediaFrame.jsx';
import { Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentMedia: 0,
      currentFriend: {
        user: {
          id: 1,
          first: 'David',
          last: 'Oh',
          display: 'David Oh'
        },
        videos: [{ type: 'video/mp4', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500308707912' }, { type: 'image/jpg', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500134536083'}, { type: 'video/mp4', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500141395399' }] /* GETTING THIS LIST OF VIDEOS CAN BE ACHIEVED WITH BOOKSHELF'S WITHRELATED FUNCTION!!!*/
      },
      friends:
      [
        {
          user: {
            id: 1,
            first: 'David',
            last: 'Oh',
            display: 'David Oh'
          },
          videos: [{ type: 'image/jpg', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500134536083' }, { type: 'video/mp4', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500141395399' }] /* GETTING THIS LIST OF VIDEOS CAN BE ACHIEVED WITH BOOKSHELF'S WITHRELATED FUNCTION!!!*/
        }, {
          user: {
            id: 2,
            first: 'Alex',
            last: 'S',
            display: 'Alex S.'
          },
          videos: [{ type: 'image/jpg', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500141637565' }, { type: 'image/jpg', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500142479736' }]
        }, {
          user: {
            id: 3,
            first: 'Anna',
            last: 'Corey',
            display: 'Anna Corey'
          },
          videos: ['www.link1.com', 'www.link2.com']
        }
      ],
      accept: '',
      files: [],
      dropzoneActive: false
    };
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  setFriendState(friend) {
    this.setState({
      currentMedia: 0,
      currentFriend: friend
    });
  }

  fetch() {
    axios.get('/fetch')
      .then(response => {
        this.setState({
          user: response.data.user
        });
      });
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

  setMediaState(boolean) {
    console.log(boolean);
    let newState = this.state.currentMedia;
    if (boolean) { 
      newState = 0;
      let newFriend = undefined;
      for (var i = 0; i < this.state.friends.length; i ++) {
        if (this.state.friends[i].user.id === this.state.currentFriend.user.id) {
          if (this.state.friends[i + 1]) {
            newFriend = this.state.friends[i + 1];
            break;
          }
        }
      }
      if (newFriend) {
        this.setState({
          currentFriend: newFriend
        });
      }
      this.setState({
        currentMedia: newState
      }); 
    } else { newState ++; }
    this.setState({
      currentMedia: newState
    });
  }

  render() {
    const { setPictureState, currentFriend, currentMedia, user, friends, accept, files, dropzoneActive } = this.state;

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
          {/*<Upload user={user} />*/}
          <FriendList friends={friends} setFriendState={this.setFriendState.bind(this)}/>
          <MediaFrame setMediaState={this.setMediaState.bind(this)} friends={friends} currentMedia={currentMedia} currentFriend={currentFriend} />
        </div>
      </Dropzone>
    );
  }
}

export default Home;
