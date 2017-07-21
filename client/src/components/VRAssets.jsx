import 'aframe';
import React from 'react';
import ReactDOM from 'react-dom';

const VRAssets = (props) => {
  let allStories = [];
  props.friends.forEach(friend => {
    friend.stories.forEach(story => {
      allStories.push(story);
    });
  });

  return (
    <a-assets>
      {
        allStories.map(story => {
          let id = story.id + ',' + story.index;
          if (story.type.slice(0, 5) === 'image') {
            return (
              <img id={id} key={id} src={story.src} crossOrigin="anonymous"/>
            );
          } else {
            return (
              <video id={id} key={id} src={story.src} crossOrigin="anonymous" onEnded={() => this.playNext()}/>
            );
          }
        })
      }
    </a-assets>
  );
};


export default VRAssets;