import 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';

const VRProfile = props => {
  let playing = '';
  if (props.currentStory.story.id === props.friend.profile.id) {
    playing = ' I AM PLAYING!!!';
  }

  return (
    <Entity>
      <Entity id="circle"
        geometry={{primitive: 'circle'}}
        material={{src: props.friend.profile.img_url}}
        animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
        position={{x: props.x, y: 0, z: -3}}
        events={{click: (() => props.onFriendClick(props.friend, props.i))}}>
      </Entity>
      <Entity text={{value: props.friend.profile.first + playing, align: 'center', color: 'white', width: 3}} position={{x: props.x, y: -1.2, z: -3}}/>
    </Entity>
  );
};

export default VRProfile;