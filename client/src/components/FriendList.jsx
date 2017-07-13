import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import FriendItem from './FriendItem.jsx';

var mockFriends = [
  { name: 'Alex', videos: [null] },
  { name: 'Corey', videos: [null] },
  { name: 'David', videos: [null] }
];

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: mockFriends
    };
  }

  render () {
    return (
      <div>
        {this.state.friends.map((friend) => {
          return ( <FriendItem friend={friend}/> )
        })}
     </div>)
  }
}

export default FriendList;
