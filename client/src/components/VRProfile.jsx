import React from 'react';
import 'aframe';
import 'aframe-animation-component';
import { Entity } from 'aframe-react';

const VRProfile = props => {
  let picRadius = 1;
  let playing = '';
  let spacing = 0.2;



  if (props.currentStory.id === props.friend.profile.id) {
    playing = ` PLAYING ${props.currentStoriesDuration.current.toFixed(2)} out of ${props.currentStoriesDuration.total.toFixed(2)}`;
    picRadius = 1.2;
  }

  



  return (
    <Entity position={{x: props.x, y: props.y, z: props.z}} rotation={{x: props.xRotation, y: props.yRotation, z: 0}}>
      <Entity id='cylinder'
        geometry={{primitive: 'cylinder', radius: picRadius, height: 0.15}}
        rotation= "0 90 90"
        material={{src: props.friend.profile.img_url}}
        // animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 100, easing: 'easeInOutQuad', loop: false, to: '1.05 1.05 1.05'}}
        // animation__yoyo={{property: 'position', dir: 'alternate', dur: 1000, easing: 'easeInSine', loop: true, to: '0 2 0'}}
        events={{click: (() => props.onFriendClick(props.friend)), mouseenter: props.toggleInEntity, mouseleave: props.toggleInEntity}}>
      </Entity>
      <Entity text={{value: props.friend.profile.first + playing, align: 'center', color: 'white', width: 6}} position={{y: -1.8}}/>
    </Entity>
  );
};

export default VRProfile;
