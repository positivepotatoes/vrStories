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
    }
    this.onMoreFriendsClick = this.onMoreFriendsClick.bind(this);
  }

  onMoreFriendsClick() {
    this.setState({
      friendsToShow: this.state.friends.slice(this.state.sliceIndex, this.state.sliceIndex + 5),
      sliceIndex: this.state.sliceIndex + 5
    })
  }

  render() {
    let x = -6;
    return (
      <Entity>

        <Entity
          geometry={{primitive: 'box', width: 2, height: 2, depth: 0.15}}
          material={{color: 'white', opacity: 0.5}}
          position={{x: -6, y: 0, z: -3.1}}
          events={{click: (() => this.onMoreFriendsClick())}}></Entity>

        <Entity
          text={{value: 'show\nmore\nfriends',  align: 'center', color: 'white', width: 10}}
          position={{x: -6, y: 0, z: -3}}></Entity>

        {
          this.state.friendsToShow.map((friend, i) => {
            x += 2.3;
            return (
              <Profile
                i={i}
                x={x}
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

//
// const VRProfiles = props => {
//   console.log('props in VRProfiles:', props);
//   let x = -6;
//   return (
//     <Entity>
//       {
//         props.friends.map((friend, i) => {
//           x += 2.3;
//           return (
//             <Profile
//               i={i}
//               x={x}
//               key={i}
//               friend={friend}
//               currentStory={props.currentStory}
//               onFriendClick={props.onFriendClick}
//             />
//           );
//         })
//       }
//     </Entity>
//   );
// };

export default VRProfiles;
