import 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';

const VRProfile = props => {
  let picRadius = 1;
  let playing = '';
  let spacing = 0.2;



  if (props.currentStory.id === props.friend.profile.id) {
    playing = ` I AM PLAYING!!! ${props.currentStory.index}`;
    picRadius = 1.2;
  }

  return (
    <Entity position={{x: props.x, y: props.y, z: props.z}} rotation={{x: props.xRotation, y: props.yRotation, z: 0}}>
      <Entity id='cylinder'
        geometry={{primitive: 'cylinder', radius: picRadius, height: 0.15}}
        rotation= "0 90 90"
        material={{src: props.friend.profile.img_url}}
        animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
        events={{click: (() => props.onFriendClick(props.friend))}}>
      </Entity>
      <Entity text={{value: props.friend.profile.first + playing, align: 'center', color: 'white', width: 6}} position={{y: -1.8}}/>
    </Entity>
  );
};

export default VRProfile;
