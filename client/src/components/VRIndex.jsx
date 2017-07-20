import 'aframe';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import VRCursor from './VRCursor.jsx';
import VRProfiles from './VRProfiles.jsx';
import mockData from './mockData.js';
// ASK TEAM IF WE CAN DELETE THIS DEPENDENCY BELOW
// import 'aframe-particle-system-component';

class VRIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: mockData.friends,
      user: mockData.user,
      toggle: true,
      background: <a-videosphere src="#video" rotation="0 -90 0"></a-videosphere>
    };
  }

  toggle () {
    console.log(this.state.friends);
    console.log('toggle!');
    if (!this.state.toggle) {
      this.setState({
        background: (<a-videosphere src="#story"></a-videosphere>)
      });
    } else {
      this.setState({
        background: (<a-sky src="#video" rotation="0 -90 0"></a-sky>)
      });
    }
    this.setState({
      toggle: !this.state.toggle
    });
  }

  componentDidMount() {
    //
  }

  render () {
    return (
      <Scene>
        <VRProfiles toggle={this.toggle.bind(this)} friends={this.state.friends}/>
        <a-assets>
          <video id="video" crossOrigin="anonymous" src="https://s3-us-west-1.amazonaws.com/vrstories/360+degree+Video-+Pugs+Chompin+down.mp4"
            autoPlay loop></video>
          <img id="story" src="https://s3-us-west-1.amazonaws.com/vrstories/360-panorama-matador-seo.jpg" crossOrigin="anonymous" ></img>
        </a-assets>
        {this.state.background}
        <VRCursor />
      </Scene>
    );
  }
}

export default VRIndex;