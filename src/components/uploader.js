import React from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Upload extends React.Component {
  state = {
    // filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0
  };

  handleUploadStart = () =>{
    this.props.displayProg(true)
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });
  }

  handleProgress = progress =>{
    this.props.setUploadProgress(progress);
    this.setState({
      uploadProgress: progress
    });
  }

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    this.props.displayProg(false)
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref(`pm_uploads/${this.props.id}`)
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      // filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      // uploadProgress: 100,
      isUploading: false
    }));

    // attachments setup
    this.props.setdata({attachments:[...this.state.downloadURLs]})

    // call update attachments in firebase myjobs
    this.props.updatedata();

    // progressbar display
    setTimeout(() =>  this.props.displayProg(false), 3000);
    // console.log(this.state)
  };


  render() {
    return (
      <div>
        
        <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
            Select File to Upload
            <FileUploader
                accept="image/*,.xml,.txt,.rtf,.pdf,.docx,.doc,"  
                name="image-uploader-multiple"
                randomizeFilename
                storageRef={firebase.storage().ref(`pm_uploads/${this.props.id}`)}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError} 
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                multiple
                hidden
            />
        </label>

        {/* <p>Progress: {this.state.uploadProgress}</p> */}

        {/* <p>Filenames: {this.state.filenames.join(", ")}</p> */}

        {/* <div >
          {this.state.downloadURLs.map((downloadURL, i) => {
            return this.props.setdata 
          })}
        </div> */}
      </div>
    );
  }
}

export default Upload;