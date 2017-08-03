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
        <a-box 
          width="4" 
          height="4" 
          depth=".3"
          color="white" 
          opacity="0.5" 
          position="0 1 -10">
        </a-box>
        <a-text value="Who viewed this story:" align="center" width="6" transparent="false" position="0 2.5 -9.5" color="black"></a-text>
        {this.props.viewers.map(viewer => {
          textPos = textPos - 0.5;
          return ( <VRView viewer={viewer} textPos={textPos}/> );
        })}
      </a-entity>
    );
  }
}

export default VRViews;

