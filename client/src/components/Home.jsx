import React from 'react';
import VRFrame from './VRFrame.jsx';
import FriendList from './FriendList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Welcome Home {this.props.user.display}!
        <FriendList user={this.props.user}/>
        <VRFrame />
      </div>
    );
  }
}

export default Home;
