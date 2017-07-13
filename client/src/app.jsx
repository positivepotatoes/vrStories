import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FriendList from './components/FriendList.jsx';
var ReactS3Uploader = require('react-s3-uploader');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: null
    }
    this.onUpload = this.onUpload.bind(this);
  }

  onUpload(e) {
    // console.log('onUpload!');
    // var reader = new FileReader();
    // var file = e.target.files[0];
    // reader.onloadend = () => {
    //   this.setState({
    //     currentVideo: file
    //   });
    // }
    ReactS3Uploader.onUpload
  }
  // style={{marginRight: spacing + 'em'}}
  render () {
    return (<div>
      <h1>VR Stories</h1>
      <form>
      <input id="myInput" type="file" style={{visibility:'hidden'}} onChange={this.onUpload}/>
      <input type="button" value="Show Dialog" ref="myInput" />
      </form>
      <FriendList />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
