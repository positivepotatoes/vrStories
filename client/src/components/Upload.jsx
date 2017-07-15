import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('acceptedFiles:', acceptedFiles);
    // let formData = new FormData();
    // formData.append('file', acceptedFiles[0]);
    // axios.post('/api/upload', formData);

    // var buffer = Buffer(acceptedFiles[0]);
    // console.log('buffer:', buffer);
  }

  render() {
    return (
      <div className="dropzone">
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Drop a file here</p>
        </Dropzone>
      </div>
    );
  }
}

// const Upload = (props) => {
//   let onDrop = (acceptedFiles, rejectedFiles) => {
//     console.log(acceptedFiles);
//     let formData = new FormData();
//     formData.append('file', acceptedFiles[0]);
//     axios.post('/api/upload', formData);
//   };
//   return (
//     <div className="dropzone">
//       <Dropzone onDrop={onDrop.bind(this)}>
//         <p>Drop a file here</p>
//       </Dropzone>
//     </div>
//   );
// };

export default Upload;
