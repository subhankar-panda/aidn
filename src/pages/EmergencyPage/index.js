import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { facialRecog } from '../../data';
import { withFirebase } from '../../data/firebase';


class EmergencyPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      foundUser: null
    }
  }
  handleTakePhoto = async (dataUri) =>  {
    const blob = this.dataURItoBlob(dataUri);
    const response = await facialRecog({image: blob});
    console.log(response)
    for (const x of response.body) {
      for (const candidate of x.candidates) {
        console.log(candidate)
        if (candidate.confidence > 0.5) {
          console.log("here!")
          this.setState({foundUser: await this.props.firebase.getUserById(candidate.personId), error: null});
          return;
        }
      } 
    }
    this.setState({foundUser: null, error: 'No Match Found :('})
  }
  dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


}
  render() {
    
    return (
      <div>
        <div className="text-success text-center my-5">
          <h1>{this.state.foundUser && `User confirmed to be ${this.state.foundUser.name}`}</h1>
        </div>
        <div className="text-danger text-center my-5">
          <h1>{this.state.error}</h1>
        </div>
    <Camera
      onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
    />
      </div>
    );
  }
}

export default withFirebase(EmergencyPage);