import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import FriendList from './components/FriendList.jsx';
import VRFrame from './components/VRFrame.jsx';
import MediaFrame from './components/MediaFrame.jsx';
import { Menu, Grid } from 'semantic-ui-react';

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
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Menu vertical size='large'>
              <Menu.Item>
                <Menu.Header as='h1'>VR Stories</Menu.Header>
              </Menu.Item>  
              {!authenticated
                ? <Menu.Item href='/login'>Login with Facebook</Menu.Item>
                : <Home user={user}/>
              }
            </Menu>
          </Grid.Column>
          <Grid.Column width={8}>
            <MediaFrame />
            {/* <VRFrame /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));