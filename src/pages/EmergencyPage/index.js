import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class EmergencyPage extends React.Component {
  handleTakePhoto = (dataUri) =>  {
    // Do stuff with the photo...
    console.log('takePhoto');
  }
  render() {
    
    return (
      <div>
    <Camera
      onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
    />
      </div>
    );
  }
}

export default EmergencyPage;