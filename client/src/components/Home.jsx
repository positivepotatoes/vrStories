import React from 'react';
import axios from 'axios';
import VRFrame from './VRFrame.jsx';
import Dropzone from 'react-dropzone';
import MediaFrame from './MediaFrame.jsx';
import { Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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
        this.setState({
          user: response.data.user
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

        <div>
          <Menu.Item>Welcome Home {user.first}!</Menu.Item>
          <MediaFrame 
            user={user}
            friends={friends}
            autoplay={true}
          />
        </div>
      </Dropzone>
    );
  }
}

export default Home;
