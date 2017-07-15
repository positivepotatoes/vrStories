import React from 'react';
import FriendItem from './FriendItem.jsx';

var mockFriends = [
  { name: 'Corey' },
  { name: 'Alex' },
  { name: 'David' }
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
        {
          this.state.friends.map((friend, i) => <FriendItem key={i} friend={friend}/>)
        }
      </div>
    );
  }
}

export default FriendList;
