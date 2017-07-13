import React from 'react';
import VRFrame from './VRFrame.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Welcome Home {this.props.user.display}! 
        <VRFrame />
      </div>
    );
  }
}

export default Home;