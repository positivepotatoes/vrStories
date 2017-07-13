import React from 'react';

class FriendList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <p>Hi {this.props.user.display}! Your session is still active :)</p>
      </div>
    );
  }
}

export default FriendList;
