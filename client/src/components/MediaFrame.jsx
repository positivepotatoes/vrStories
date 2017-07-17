import React from 'react';

const MediaFrame = ({setMediaState, currentMedia, friends, currentFriend}) => {
  let media;
  let mediaTotal = currentFriend.videos.length;
  let allPlayed = false;
  currentMedia < mediaTotal - 1 ? allPlayed : allPlayed = true;
  let whenChange = () => {
    setMediaState(allPlayed);
  };
  if (currentFriend.videos[currentMedia].type.slice(0, 5) === 'video') {
    media = (
      <video width="800" autoPlay onEnded={whenChange} onClick={whenChange}>
        <source src={currentFriend.videos[currentMedia].aws_link} type={currentFriend.videos[currentMedia].type}></source>
      </video>
    );
  } else {
    media = (<img width="800" src={currentFriend.videos[currentMedia].aws_link} onClick={whenChange}></img>);
    let timeout = setTimeout(() => {
      setMediaState(allPlayed);
      clearTimeout(timeout);
    }, 5000);
  }
  return (
    <div>
      {media}  
    </div>
  );
};

export default MediaFrame;