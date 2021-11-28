import React, {Component} from 'react';
import './../../FrontPage.css';
import './createTestCase.css';

export default class createTestCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
       testName : '',
       inputTestCase : null,
       outputTestCase : null
    };
 }

 handleChange = (event) => {
    event.preventDefault();

    this.setState({
       [event.target.value] : event.target.value,
    });
 }
 
 handleFileChange = (event) => {
  this.setState({choosenFile : event.target.files})
}

onUploadingFile = async(event) => {


  const selectedFile = this.state.choosenFile;

  const fileData = new FormData();
  fileData.append('choosenFile', selectedFile[0]);


 const requestOptions = {
      method : "POST",
      body : fileData
 }

 const response = fetch('/storeTestCaseFiles', requestOptions)
 .then(response => response.json())
 .then(data => {
     alert('File has been successfully stored !')
 })
 .catch(error => {
     alert("Error ! Couldn't upload file")
 })

}


render() {
    return (
        <div class = 'forAll'>
           <h1 id = 'marginGap'>Test cases !</h1>
           <p><b>Input files should be named as 'input.txt' and output file should be named as 'output.txt'. </b></p>
           <div class = 'first'>
             
              <input class = 'input' id = 'inputTestCase' type = 'file' onChange={this. handleFileChange}/>
              <input  id = 'curButton' type = 'button' value = 'Submit' onClick ={this.onUploadingFile}/> <hr/>

              <input class = 'input' id = 'outputTestCase' type = 'file' onChange = {this.handleFileChange}/>
              <input id = 'curButton' type = 'button' value = 'Submit' onClick ={this.onUploadingFile}/>
           </div>
           
           <br/> <br/>
        </div>
    );
  }

}
