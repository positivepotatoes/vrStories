import React from 'react';
import axios from 'axios';
import { Menu, Button } from 'semantic-ui-react';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
  }

  // the function below is copied from Upload component, need to implement this later!
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('acceptedFiles:', acceptedFiles);
    let formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    axios.post('/api/upload', formData);
  }

  render() {
    return (
      <Menu.Item>
        <Button>uploadButton here</Button>
      </Menu.Item>
    );
  }
}

export default UploadButton;
