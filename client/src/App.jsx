import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import FriendList from './components/FriendList.jsx';
import MediaFrame from './components/MediaFrame.jsx';
import { Header, Container, Segment, Grid, Button } from 'semantic-ui-react';

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
        {!authenticated
          ? <Grid>
            <Grid.Row color='black' id='login'>
              <Button href='/login' floated='left'>Login with Facebook</Button>
            </Grid.Row>

            <Grid.Row color='black' id='banner' textAlign='center'> 
              <Header inverted >
                  VRStories
              </Header>
            </Grid.Row>

            <Grid.Row id='tag'>
                GitHub: positivepotatoes 
            </Grid.Row>
          </Grid>
          : <Home/>
        }
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
