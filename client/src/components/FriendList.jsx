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
    }
  }

  render () {
    return (
      <div>
        <p>Hi {this.props.user.display}! Your session is still active :)</p>
        {this.state.friends.map((friend) => {
          return ( <FriendItem friend={friend} /> )
        })}
      </div>
    );
  }
}

export default FriendList;
