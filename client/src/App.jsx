import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import FriendList from './components/FriendList.jsx';
import MediaFrame from './components/MediaFrame.jsx';
import { Header, Container } from 'semantic-ui-react';

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
          ? <div>
            <Container textAlign='center'>
              <Header size='large' >VR Stories</Header>
              <a href='/login'>Login with Facebook</a>
            </Container>
          </div>
          : <Home/>
        }
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
