import 'aframe';
import 'aframe-animation-component';
import React from 'react';
import VRViews from './VRViews.jsx';
import axios from 'axios';

class VRViewsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewsPanel: false,
      buttonText: 'show users\nwho viewed\nthis story',
      viewers: undefined
    };
    this.onShowViewersClick = this.onShowViewersClick.bind(this);
    this.getViewers = this.getViewers.bind(this);
  }

  getViewers(storyId) {
    axios.get(`/api/views/ownstoryviews/${storyId}`)
      .then(response => {
        this.setState({
          viewers: response.data
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.storyId !== this.props.storyId) {
      this.getViewers(this.props.storyId);
    }
  }

  onShowViewersClick(storyId) {
    this.getViewers(storyId);
    this.setState({
      viewsPanel: !this.state.viewsPanel,
      buttonText: 'hide users\nwho viewed\nthis story'
    });
  }

  render() {
    return (
      <a-entity>
        <a-box onClick={() => this.onShowViewersClick(this.props.storyId)} 
               color="#c6c6c6" 
               opacity="0.55" 
               position="0 -0.8 -3" 
               height="0.235" 
               width="0.235" 
               depth="0.235" 
               rotation="40 0 45"
               animation__color={`property: color; dur: 1100; easing: easeInSine; to: #8e8e8e; dir: alternate; loop: true`}
               animation__shrink={`property: scale; dur: 1100; easing: easeInSine; to: .95 .95 .95; dir: alternate; loop: true; delay: ${Math.round(Math.random() * 2000)}`}
               animation__tilt={`property: rotation; dur: 1100; easing: easeInSine; from: 40 0 43.2; to: 40 0 46.8; dir: alternate; loop: true`}
               >
                {this.state.buttonText}
               </a-box>
        <a-text 
          value={this.state.viewsPanel ? 'Hide\nViews' : 'See\nViews'} 
          align="center" 
          color="black" 
          opacity="0.65" 
          position="0 -0.66 -2.5" 
          width="2" 
          rotation="0 0 0"
          animation__shrink={`property: scale; dur: 1100; easing: easeInSine; to: .95 .95 .95; dir: alternate; loop: true; delay: ${Math.round(Math.random() * 2000)}`}
          animation__tilt={`property: rotation; dur: 1100; easing: easeInSine; from: 0 0 -1.8; to: 0 0 1.8; dir: alternate; loop: true`}/>
        { this.state.viewsPanel && this.state.viewers && <VRViews viewers={this.state.viewers}/> }
      </a-entity>
    );
  }
}

export default VRViewsButton;
