import React from 'react';
import VRFrame from './VRFrame.jsx';
import FriendList from './FriendList.jsx';
import Upload from './Upload.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Welcome Home {this.props.user.display}!
        <Upload />
        <FriendList user={this.props.user}/>
        <VRFrame />
      </div>
    );
  }
}

export default Home;
