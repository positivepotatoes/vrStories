import aframe from 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';
import Profile from './VRProfile.jsx';


const VRProfiles = props => {
  let x = -6;
  return (
    <Entity>
      {
        props.friends.map((friend, i) => {
          x += 2;
          return (
            <Profile
              i={i}
              x={x}
              key={i}
              friend={friend}
              currentStory={props.currentStory}
              onFriendClick={props.onFriendClick}
            /> 
          );
        })
      }
    </Entity>
  );
};

export default VRProfiles;