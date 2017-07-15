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
      friends: ['alex', 'anna', 'david']
    };
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
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

  render() {
    return (
      <div>
        Welcome Home {this.state.user.first}!
        <UploadButton/>
        <Upload user={this.state.user}/>
        <FriendList friends={this.state.friends}/>
        <MediaFrame/>
      </div>
    );
  }
}

export default Home;
