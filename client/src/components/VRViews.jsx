import 'aframe';
import React from 'react';

class VRViews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <a-entity>
        <a-plane width="2" height="4" color="white" opacity="0.5" position="-3.76 -0.8 -9.01"></a-plane>
        <a-text value={this.props.viewers} position="-3.76 -0.8 -9.01"></a-text>
      </a-entity>
    );
  }
}

export default VRViews;
