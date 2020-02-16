import React from 'react';
import {Camera} from 'react-html5-camera-photo';

class Cam extends React.Component {
  handleTakePhoto = async (dataUri) =>  {
    this.props.form.setFieldValue(this.props.field.name, this.dataURItoBlob(dataUri))
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
      <Camera
      onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
    />
    )
  }
}

export default Cam;