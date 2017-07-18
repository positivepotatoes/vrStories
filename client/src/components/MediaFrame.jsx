import React from 'react';

const MediaFrame = (props) => { 
  let onMediaClick = () => {
    props.onMediaClick();
  };

  let onVideoEnd = () => {
    props.playNextOrStop();
  };

  return (
    <video width="400" autoPlay onClick={onMediaClick} onEnded={onVideoEnd} src={props.currentVideo.aws_link} type={props.currentVideo.type}>
    </video>
  );
};

export default MediaFrame;