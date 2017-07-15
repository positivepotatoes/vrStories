import React from 'react';

const MediaFrame = (props) => {
  return (
    <div>
      <video width="800" autoPlay>
        <source src="https://s3-us-west-1.amazonaws.com/vrstories/1500141395399" type="video/mp4"></source>
      </video>
      <img width="800" src="https://s3-us-west-1.amazonaws.com/vrstories/1500134536083"></img>   
    </div>
  );
};

export default MediaFrame;