import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import FriendList from './components/FriendList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: ''
    }
  }

  render () {
    return (<div>
      <h1>VR Stories</h1>
      <FriendList />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
