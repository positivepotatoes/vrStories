import 'aframe';
import React from 'react';
import VRViews from './VRViews.jsx';
import axios from 'axios';

class VRViewsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewsPanel: false,
      buttonText: 'Show users who viewed this story',
      viewers: undefined
    };
    this.onShowViewersClick = this.onShowViewersClick.bind(this);
    this.getViewers = this.getViewers.bind(this);
  }

  getViewers(storyId) {
    console.log('getViewers invoked!');
    // get people who viewed a story with given id:
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
      buttonText: 'Hide users who viewed this story'
    });
  }

  render() {
    return (
      <a-entity>
        <a-plane onClick={() => this.onShowViewersClick(this.props.storyId)} color="white" opacity="0.5" position="-2.790 -4.007 -2.807">{this.state.buttonText}</a-plane>
        <a-text value={this.state.viewsPanel ? 'Hide users who viewed this story' : 'Show users who viewed this story'} color="white" opacity="0.5" position="-2.790 -4.007 -2.807"></a-text>
        { this.state.viewsPanel && this.state.viewers && <VRViews viewers={this.state.viewers}/> }
      </a-entity>
    );
  }
}

export default VRViewsButton;
