import 'aframe';
import React from 'react';

const VRView = props => (
  <a-text value={props.viewer} width="7" align="center" position={`0 ${props.textPos} -10`}></a-text>
);

export default VRView;
