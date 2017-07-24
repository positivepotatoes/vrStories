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
      <img id={'-2,-2'} src={props.splashScreen} crossOrigin="anonymous"/>
      {
        allStories.map((story, i) => {
          console.log('story', story);
          let id = story.id + ',' + story.index;
          console.log('making assets', id);
          if (story.type.slice(0, 5) === 'image') {
            return (
              <img id={id} key={i} src={story.src} crossOrigin="anonymous"/>
            );
          } else {
            return (
              <video id={id} key={i} src={story.src} crossOrigin="anonymous"/>
            );
          }
        })
      }
    </a-assets>
  );
};


export default VRAssets;