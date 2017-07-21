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
    let n = this.state.friendsToShow.length;
    console.log('n',n);
    let start = (n) * Math.PI/12;
    console.log('start', start);
    let theta = (Math.PI - start)/2;
    console.log('theta', theta);
    let x, z, yRotation;
    let radius = 10;
    let y = -4;

    return (
      <Entity>

        <Entity
          geometry={{primitive: 'box', width: 2, height: 2, depth: 0.15}}
          material={{color: 'white', opacity: 0.5}}
          position={{x: -Math.cos(theta)*radius, y: y, z: -Math.sin(theta)*radius}}
          rotation={{x: -Math.atan(Math.abs(y)/radius)*180/Math.PI, y: ((Math.PI/2) - theta)*180/Math.PI}}
          events={{click: (() => this.onMoreFriendsClick())}}></Entity>

        <Entity
          text={{value: 'show\nmore\nfriends', align: 'center', color: 'white', width: 10}}
          position={{x: -Math.cos(theta)*radius, y: y, z: .1 -Math.sin(theta)*radius}}
          rotation={{x: -Math.atan(Math.abs(y)/radius)*180/Math.PI, y: ((Math.PI/2) - theta)*180/Math.PI}}>
        </Entity>
        {
          this.state.friendsToShow.map((friend, i) => {
            theta += (Math.PI/12);
            x = -Math.cos(theta)*radius;
            console.log('x', x);
            z = -Math.sin(theta)*radius;
            console.log('z', z);
            let xRotation = -Math.atan(Math.abs(y)/radius)*180/Math.PI;
            yRotation = ((Math.PI/2) - theta)*180/Math.PI;
            console.log('yRotation', yRotation);
            return (
              <Profile
                i={i}
                x={x}
                y={y}
                z={z}
                xRotation={xRotation}
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
