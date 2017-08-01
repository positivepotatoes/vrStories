import 'aframe';
import React from 'react';
import VRView from './VRView.jsx';

class VRViews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let textPos = 1.5;
    return (
      <a-entity>
        <a-text value="Users who viewed your story:" align="center" width="6" position="0 1.5 -10"></a-text>
        <a-plane width="4" height="4" color="white" opacity="0.5" position="0 0 -10"></a-plane>
        {this.props.viewers.map(viewer => {
          textPos = textPos - 0.5;
          return ( <VRView viewer={viewer} textPos={textPos}/> );
        })}
      </a-entity>
    );
  }
}

export default VRViews;

