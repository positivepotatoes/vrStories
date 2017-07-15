import React from 'react';
import Upload from './Upload.jsx';
import UploadButton from './UploadButton.jsx';
import FriendList from './FriendList.jsx';
import VRFrame from './VRFrame.jsx';
import MediaFrame from './MediaFrame.jsx';
import { Button, Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Menu size='large' vertical>
          <Menu.Item>
            Welcome Home {this.props.user.display}!
            <Upload user={this.props.user}/>
          </Menu.Item>
          <FriendList user={this.props.user}/>
        </Menu>

        <MediaFrame />
        {/* <VRFrame /> */}
      </div>
    );
  }
}

export default Home;
