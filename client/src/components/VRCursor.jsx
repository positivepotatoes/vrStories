import 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import React from 'react';

const Cursor = props => (
  <a-entity camera look-controls mouse-cursor rotation="-10 0 0">
    <a-entity cursor="fuse: true; fuseTimeout: 1000"
      position="0 0 -1"
      geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
      material="transparent: true; opacity: .25; metalness: .1">
      <a-animation begin="fusing" easing="ease-in" attribute="scale"
        fill="none" from="1 1 1" to="0.1 0.1 0.1" dur="1000"
        end="mouseleave" />
      <a-animation attribute="material.color" direction="alternate" from="#ececec" to="#8e8e8e" repeat="indefinite"/>
    </a-entity>
  </a-entity>
);

export default Cursor;
