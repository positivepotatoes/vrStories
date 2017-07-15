import React from 'react';
import axios from 'axios';
import Upload from './Upload.jsx';
import UploadButton from './UploadButton.jsx';
import FriendList from './FriendList.jsx';
import VRFrame from './VRFrame.jsx';
import MediaFrame from './MediaFrame.jsx';
import { Menu } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentVideo: null,
      friends: 
        [
          {
            user: {
              id: 1, 
              first: 'David', 
              last: 'Oh', 
              display: 'David Oh' }, 
            videos: ['www.link1.com', 'www.link2.com'] /* GETTING THIS LIST OF VIDEOS CAN BE ACHIEVED WITH BOOKSHELF'S WITHRELATED FUNCTION!!!*/
          }, {
            user: {
              id: 2, 
              first: 'Alex', 
              last: 'S', 
              display: 'Alex S.' }, 
            videos: ['www.link1.com', 'www.link2.com']
          }, {
            user: {
              id: 3, 
              first: 'Anna', 
              last: 'Corey', 
              display: 'Anna Corey' }, 
            videos: ['www.link1.com', 'www.link2.com']
          }
        ]
    };
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    axios.get('/fetch')
      .then(response => {
        this.setState({
          user: response.data.user
        });
      });

    // //first make api call to get list of friends
    // axios.get(`/profiles/${this.state.user.id}/friends`)
    //   .then(response => {
    //     // we should be given a list of of friends withRelated videos!!!
    //     this.setState({
    //       friends: response.data
    //     });
    //   });
  }

  render() {
    const { user, friends } = this.state;
    return (
      <div>
        Welcome Home {user.first}!
        <UploadButton/>
        <Upload user={user}/>
        <FriendList friends={friends}/>
        <MediaFrame/>
      </div>
    );
  }
}

export default Home;
