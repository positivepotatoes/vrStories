import React from 'react';

const MediaFrame = ({currentMedia, friends, currentFriend}) => {
  let media;
  if (currentFriend.videos[currentMedia].type.slice(0, 5) === 'video') {
    media = (
      <video width="800" autoPlay>
        <source src={currentFriend.videos[currentMedia].link} type={currentFriend.videos[currentMedia].type}></source>
      </video>
    );
  } else {
    media = (<img width="800" src={currentFriend.videos[currentMedia].link}></img>);
  }
  return (
    <div>
      {media}  
    </div>
  );
};

export default MediaFrame;