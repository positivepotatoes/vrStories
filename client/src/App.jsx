import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import FriendList from './components/FriendList.jsx';
import VRFrame from './components/VRFrame.jsx';
import MediaFrame from './components/MediaFrame.jsx';
import { Header, Icon, Button, Menu } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
    this.verify = this.verify.bind(this);
  }

  componentDidMount() {
    this.verify();
  }

  verify() {
    axios.get('/verify')
      .then(response => {
        this.setState({
          authenticated: response.data
        });
      });
  }

  render () {
    const { authenticated, user } = this.state;

    return (
      <div>
        <Menu size='massive' vertical>
          <Menu.Item>
            <Header as='h1'>VR Stories <Icon name='child'/></Header>
          </Menu.Item>
          {!authenticated
            ? <Menu.Item href='/login'>Login with Facebook</Menu.Item>
            : <Home/>
          }
        </Menu>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
