import React from 'react';
import axios from 'axios';
import Upload from './Upload.jsx';
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
      currentMedia: 1,
      currentFriend: {
        user: {
          id: 1,
          first: 'David',
          last: 'Oh',
          display: 'David Oh'
        },
        videos: [{ type: 'image/jpg', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500134536083' }, { type: 'video/mp4', link: 'https://s3-us-west-1.amazonaws.com/vrstories/1500141395399' }] /* GETTING THIS LIST OF VIDEOS CAN BE ACHIEVED WITH BOOKSHELF'S WITHRELATED FUNCTION!!!*/
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
      ]
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

  setMediaState(boolean) {
    console.log(boolean);
    let newState = this.state.currentMedia;
    if (boolean) { newState = 0; } 
    else { newState ++; }
    this.setState({
      currentMedia: newState
    });
  }

  render() {
    const { setPictureState, currentFriend, currentMedia, user, friends } = this.state;
    return (
      <div>
        Welcome Home {user.first}!
        <UploadButton />
        <Upload user={user} />
        <FriendList friends={friends} setFriendState={this.setFriendState.bind(this)}/>
        <MediaFrame setMediaState={this.setMediaState.bind(this)} friends={friends} currentMedia={currentMedia} currentFriend={currentFriend} />
      </div>
    );
  }
}

export default Home;
