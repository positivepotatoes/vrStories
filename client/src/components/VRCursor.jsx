import 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';

const Cursor = props => (
  <a-entity camera look-controls mouse-cursor/>
);

export default Cursor;