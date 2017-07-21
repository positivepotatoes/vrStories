import aframe from 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';
import Profile from './VRProfile.jsx';

class VRProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliceIndex: 5,
      friends: this.props.friends,
      friendsToShow: this.props.friends.slice(0, 5)
    };
    this.onMoreFriendsClick = this.onMoreFriendsClick.bind(this);
    let n = friendsToShow.length;
    console.log('n',n);
    let start = (n) * Math.PI/12;
    console.log('start', start);
    let theta = (Math.PI - start)/2;
    console.log('theta', theta);
    let x, z, yRotation;
    let radius = 10;
  }

  onMoreFriendsClick() {
    if (this.state.sliceIndex > this.state.friends.length) {
      this.setState({
        friendsToShow: this.props.friends.slice(0, 5),
        sliceIndex: 5
      });
    } else {
      this.setState({
        friendsToShow: this.state.friends.slice(this.state.sliceIndex, this.state.sliceIndex + 5),
        sliceIndex: this.state.sliceIndex + 5
      });
    }
  }

  render() {
    return (
      <Entity>

        <Entity
          geometry={{primitive: 'box', width: 2, height: 2, depth: 0.15}}
          material={{color: 'white', opacity: 0.5}}
          position={{x: -6, y: 0, z: -3.1}}
          events={{click: (() => this.onMoreFriendsClick())}}></Entity>

        <Entity
          text={{value: 'show\nmore\nfriends', align: 'center', color: 'white', width: 10}}
          position={{x: -6, y: 0, z: -3}}></Entity>

        {
          this.state.friendsToShow.map((friend, i) => {
            x = -Math.cos(theta)*radius;
            console.log('x', x);
            z = -Math.sin(theta)*radius;
            console.log('z', z);
            yRotation = ((Math.PI/2) - theta)*180/Math.PI;
            console.log('yRotation', yRotation);
            theta += (Math.PI/12);
            return (
              <Profile
                i={i}
                x={x}
                z={z}
                yRotation={yRotation}
                radius={radius}
                key={i}
                friend={friend}
                currentStory={this.props.currentStory}
                onFriendClick={this.props.onFriendClick}
              />
            );
          })
        }
      </Entity>
    );
  }
}

export default VRProfiles;
