import React from 'react';
import axios from 'axios';
import 'aframe';
import 'aframe-mouse-cursor-component';
import Dropzone from 'react-dropzone';
import MediaFrame from './MediaFrame.jsx';
import VRCursor from './VRCursor.jsx';
import Stories from 'aframe-react-stories';
import 'aframe-animation-component';
import VRViewsButton from './VRViewsButton.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friends: null,
      assets: [],
      inVRMode: true,
      // States below are used for react-dropzone
      accept: '',
      files: [],
      dropzoneActive: false,
      //  for view count:
      dBProfileId: null,
      viewers: [],
      storyDBId: null,
      viewsButton: false
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
                friends: response.data.friends,
                dBProfileId: response.data.profile_id
              });
            });
        });
      });
  }

  assetsCallback(assets) {
    this.setState({ assets });
  }

  toggleInVRMode() {
    this.setState({
      inVRMode: !this.state.inVRMode
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
    let formData = new FormData();
    formData.append('file', files[0]);
    formData.append('userId', this.state.user.uploadId);
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

  viewCountCallback(currentStory) {
    if (currentStory.id === -1) {
      //  it's own story -> get viewers data
      this.setState({
        viewsButton: true,
        storyDBId: currentStory.storyDBId
      });
    } else if (currentStory.id === -2) {
      //  splash screen -> hide viewsButton
      this.setState({
        viewsButton: false
      });
    } else {
      //  not own story -> save view to db
      axios.post('api/views/addview', { storyId: currentStory.storyDBId, profileId: this.state.dBProfileId });
      this.setState({
        viewsButton: false
      });
    }
  }

  render() {
    const { user, friends, accept, files, dropzoneActive } = this.state;

    const overlayStyle = {
      position: 'absolute',
      zIndex: 1000,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '30em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      verticalAlign: 'middle',
      color: '#fff',
      transform: 'scale(1.1)'
    };

    let blur = {
      position: 'absolute',
      height: '100%',
      width: '100%'
    };
    if (dropzoneActive) {
      blur = {
        position: 'absolute',
        height: '100%',
        width: '100%',
        WebkitFilter: 'blur(3px)',
        MozFilter: 'blur(3px)',
        OFilter: 'blur(3px)',
        msFilter: 'blur(3px)',
        filter: 'blur(3px)',
      };
    }

    let scene;
    if (this.state.friends) {
      if (this.state.inVRMode) {
        scene =
          <a-scene vr-mode-ui="enabled: true">
            <a-assets>
              {this.state.assets}
            </a-assets>
            {this.state.viewsButton && <VRViewsButton storyId={this.state.storyDBId} viewers={this.state.viewers}/>}
            <Stories
              user={user}
              friends={friends}
              autoPlayNext={true}
              autoPlayStart={false}
              splashScreen={'/splash.jpg'}
              defaultDuration={6000}
              enableAnimation={true}
              assetsCallback={this.assetsCallback.bind(this)}
              exitCallback={this.toggleInVRMode.bind(this)}
              viewCallback={this.viewCountCallback.bind(this)}
            />
            <VRCursor/>
          </a-scene>;
      } else {
        scene =
          <div>
            <MediaFrame
              user={user}
              friends={friends}
              autoPlayNext={true}
              autoPlayStart={false}
              toggleInVRMode={this.toggleInVRMode.bind(this)}
            />
          </div>;
      }
    }

    return (
      <Dropzone
        style={{}}
        disableClick
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop to share your story</div> }
        <div style={blur} className='app'>
          {scene}
        </div>
      </Dropzone>
    );
  }
}

export default Home;
