import React from 'react';

const MediaFrame = (props) => { 
  let onVideoClick = () => {
    console.log('clicked');
  };

  let onVideoEnd = () => {
    props.playNextOrStop();
  };

  return (
    <video width="800" autoPlay onClick={onVideoClick} onEnded={onVideoEnd} src={props.currentVideo.aws_link} type={props.currentVideo.type}>
    </video>
  );
};

export default MediaFrame;