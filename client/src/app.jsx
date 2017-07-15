import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import FriendList from './components/FriendList.jsx';
import VRFrame from './components/VRFrame.jsx';
import MediaFrame from './components/MediaFrame.jsx';
import { Header, Icon, Button } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: '',
      authenticated: false,
      user: {},
      friends: []
    };
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate() {
    axios.get('/authenticate')
      .then(response => {
        this.setState({
          authenticated: response.data.authenticated,
          user: response.data.user
        });
      });
  }

 

  render () {
    const { authenticated, user } = this.state;

    return (
      <div>
        <Header as='h2' size='huge'>
          <Header.Content>
            VR Stories <Icon name='child' />
          </Header.Content>
        </Header>

        {!authenticated
          ? <Button href='/login'>Login with Facebook</Button>
          : <Home user={user}/>
        }
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));