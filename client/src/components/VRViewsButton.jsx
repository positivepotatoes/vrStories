import 'aframe';
import React from 'react';
import VRViews from './VRViews.jsx';

class VRViewsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewsPanel: false,
      buttonText: 'Show users who viewed this story'
    }
    this.onShowViewersClick = this.onShowViewersClick.bind(this);
  }

  onShowViewersClick() {
    this.setState({
      viewsPanel: !this.state.viewsPanel,
      buttonText: 'Hide users who viewed this story'
    })
  }

  render() {
    return (
      <a-entity>
      <a-plane onClick={() => this.onShowViewersClick()} color="white" opacity="0.5" position="-2.790 -4.007 -2.807">{this.state.buttonText}</a-plane>
      <a-text value={this.state.viewsPanel ? 'Hide users who viewed this story' : 'Show users who viewed this story'} color="white" opacity="0.5" position="-2.790 -4.007 -2.807"></a-text>
      { this.state.viewsPanel && <VRViews viewers={this.props.viewers}/> }
      </a-entity>
    );
  }
}

export default VRViewsButton;
