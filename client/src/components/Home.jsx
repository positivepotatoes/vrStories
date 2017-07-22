import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import VRStories from './VRStories.jsx';
import MediaFrame from './MediaFrame.jsx';
import { Header } from 'semantic-ui-react';
import VRCursor from './VRCursor.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friends: null,
      // States below are used for react-dropzone
      accept: '',
      files: [],
      dropzoneActive: false
    };
    this.fetch = this.fetch.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  fetch() {
    axios.get('/fetch')
      .then(response => {
        this.setState({ user: response.data.user }, () => {
          axios.get(`/api/profiles/${this.state.user.id}/friends`)
            .then(response => {
              this.setState({
                user: response.data.user,
                friends: response.data.friends
              });
            });
        });
      });
  }


  // Functions below are used for react-dropzone
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
    formData.append('userId', this.state.user.profile.uploadId);
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
    const { user, friends, accept, files, dropzoneActive } = this.state;

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

    let mediaFrame, vRStories;

    if (this.state.friends) {
      mediaFrame = <MediaFrame 
        user={user}
        friends={friends}
        autoPlayNext={true}
        autoPlayStart={false}
      />;
    }

    if (this.state.friends) {
      vRStories = <VRStories 
        user={user}
        friends={friends}
        autoPlayNext={true}
        autoPlayStart={false}
        splashScreen={'https://s3-us-west-1.amazonaws.com/vrstories/splash.jpg'}
        defaultDuration={5000}
        VRCursor={<VRCursor/>}
      />;
    }

    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop file to upload to your story</div> }
        {/* CHANGE vRIndex TO mediaFrame IF YOU WANT TO USE REGULAR/NON VR PLAYER*/}
        {vRStories}        
      </Dropzone>
    );
  }
}

export default Home;
