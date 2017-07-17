import React from 'react';

const MediaFrame = ({setMediaState, currentMedia, friends, currentFriend}) => {
  let media;
  let mediaTotal = currentFriend.videos.length;
  let allPlayed = false;
  currentMedia < mediaTotal - 1 ? allPlayed : allPlayed = true;
  if (currentFriend.videos[currentMedia].type.slice(0, 5) === 'video') {
    let onEnd = () => {
      console.log('ended');
      setMediaState(allPlayed);
    };
    media = (
      <video width="800" autoPlay>
        <source src={currentFriend.videos[currentMedia].link} type={currentFriend.videos[currentMedia].type} onEnded={onEnd}></source>
      </video>
    );
  } else {
    media = (<img width="800" src={currentFriend.videos[currentMedia].link}></img>);
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