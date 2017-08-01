import 'aframe';
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
        <a-plane onClick={() => this.onShowViewersClick(this.props.storyId)} color="white" opacity="0.5" position="-0.5 -1.05 -1.5" height="0.2" width="0.3" rotation="0 15 0">{this.state.buttonText}</a-plane>
        <a-text value={this.state.viewsPanel ? 'hide users\nwho viewed\nthis story' : 'show users\nwho viewed\nthis story'} color="white" opacity="0.5" position="-0.61 -1.03 -1.45" width="1" rotation="0 15 0"></a-text>
        { this.state.viewsPanel && this.state.viewers && <VRViews viewers={this.state.viewers}/> }
      </a-entity>
    );
  }
}

export default VRViewsButton;
