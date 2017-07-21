import 'aframe';
import React from 'react';
import ReactDOM from 'react-dom';


class VRAssets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let allStories = [];
    this.props.friends.forEach(friend => {
      friend.stories.forEach(story => {
        allStories.push(story);
        console.log(story);
      });
    });

    return (
      <a-assets>
        {
          allStories.map(story => {
            if (story.type.slice(0, 5) === 'image') {
              return (
                <img id={story.id + ',' + story.index} src={story.src} crossOrigin="anonymous"/>
              );
            } else {
              return (
                <video id={story.id + ',' + story.index} src={story.src} crossOrigin="anonymous" autoPlay={story.playing} onEnded={() => this.playNext()}/>
              );
            }
          })
        }
      </a-assets>
    );
  }
}


export default VRAssets;