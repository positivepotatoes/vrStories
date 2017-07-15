import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const Upload = (props) => {
  let onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);
    let formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    axios.post('/api/upload', formData);
  };
  return (
    <div className="dropzone">
      <Dropzone onDrop={onDrop.bind(this)}>
        <p>Drop a file here</p>
      </Dropzone>
    </div>
  );
};

export default Upload;