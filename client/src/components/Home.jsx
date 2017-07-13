import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Welcome Home {this.props.user.display}! 
      </div>
    );
  }
}

export default Home;