import React from 'react';
import Upload from './Upload.jsx';
import FriendList from './FriendList.jsx';
import VRFrame from './VRFrame.jsx';
import MediaFrame from './MediaFrame.jsx';
import { Segment, Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Menu size='large' vertical>
          <Menu.Item>
            Welcome Home {this.props.user.display}!
            <Upload user={this.props.user}/>
          </Menu.Item>
          <FriendList user={this.props.user}/>
        </Menu>

        <MediaFrame />
        {/* <VRFrame /> */}
=======
        <Menu.Item>
          Welcome Home {this.props.user.display}!
          <Upload />
        </Menu.Item>  
        <FriendList user={this.props.user}/>
>>>>>>> changes right before making dropzone full screen of app
      </div>
    );
  }
}

export default Home;
