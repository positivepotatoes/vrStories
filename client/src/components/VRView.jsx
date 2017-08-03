import 'aframe';
import React from 'react';

const VRView = props => (
  <a-text value={props.viewer} width="7" align="center" position={`0 ${props.textPos + 1} -9.8`}></a-text>
);

export default VRView;
