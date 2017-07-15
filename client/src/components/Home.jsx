import React from 'react';
import Upload from './Upload.jsx';
import UploadButton from './UploadButton.jsx';
import FriendList from './FriendList.jsx';
import VRFrame from './VRFrame.jsx';
import MediaFrame from './MediaFrame.jsx';
import { Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Welcome Home {this.props.user.display}!
        <UploadButton/>
        <Upload user={this.props.user}/>
        <FriendList user={this.props.user}/>
      </div>
    );
  }
}

export default Home;
