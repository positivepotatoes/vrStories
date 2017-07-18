import React from 'react';
import axios from 'axios';
import { Menu, Button, Input} from 'semantic-ui-react';

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
      <div className="fileUpload btn btn-primary">
        <span>Upload</span>
        <Input type="file"/>
      </div>
    );
  }
}

export default UploadButton;
