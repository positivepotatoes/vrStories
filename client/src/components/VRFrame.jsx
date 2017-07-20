import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class VRFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Scene>
        <Entity primitive='a-videosphere' autoPlay loop='false' id='story' src='https://s3-us-west-1.amazonaws.com/vrstories/Cute+Cats+VR+360+Experience.mp4'/>
        <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: -2, z: -5}}/>
      </Scene>
    );
  }
}

export default VRFrame;