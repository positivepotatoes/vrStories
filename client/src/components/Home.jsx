import React from 'react';
import VRFrame from './VRFrame.jsx';
import FriendList from './FriendList.jsx';
import Upload from './Upload.jsx';
import { Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Menu.Item>
          Welcome Home {this.props.user.display}!
          <Upload />
        </Menu.Item>
        <FriendList user={this.props.user}/>
      </div>
    );
  }
}

export default Home;
