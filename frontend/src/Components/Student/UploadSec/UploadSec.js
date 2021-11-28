import axios from 'axios';
import React, {Component} from 'react';
import {useState} from 'react';
import './UploadSec.css';
import history from './../../../history';

export default class UploadSec extends Component {

    constructor(props){
        super(props);
      
        this.state = {
          choosenFile : null,
          printName : '',
          printText : '',
          studentId : '',
          examName : '', 
          examType : '',
          question : '',
          startTime : '',
          endTime : '',
          attendedTime : '',
          marksObtained : '',
          totalMarks : '',
          percentageObtained : ''
       };

      }
    
     componentWillMount(){
        const states = this.props.location.state;

        this.setState({studentId : states[0], examName : states[1], examType : states[2], question : states[3], startTime : states[4], endTime : states[5],
        attendedTime : states[6], marksObtained : states[7], totalMarks : states[8], percentageObtained : states[9]});


     }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
          [event.target.id] : event.target.value,
        })
    }

    handleFileChange = (event) => {

        this.setState({
            [event.target.id] : event.target.files
        })
    }

    onUploadingFile = async(event) => {

        event.preventDefault();

        const selectedFile = this.state.choosenFile;

        const fileData = new FormData();
        fileData.append('choosenFile', selectedFile[0]);

        const requestOptions = {
             method : "POST",
             body : fileData
        }

        const response = fetch('/uploadFiles', requestOptions)
        .then(response => response.json())
        .then(data => {
            alert('File has been successfuly uploaded');
        })
        .catch(error => {

            alert("Error ! Couldn't upload file")
        })

    }

    render() {
        return (
        <>
            <div class="ssplit left1">
           <h2>Question</h2>
           <p>{this.state.question}</p>
           </div>

           <div class="ssplit right1">
           
            <div>
              <div class = 'centered'>
                <input class = 'input' id =  'choosenFile' type = 'file' multiple onChange={this.handleFileChange}/>   <br/> <br/>
                <input id = 'button2' type = 'button' value = 'Upload Handwritten File' onClick = {this.onUploadingFile}/>
               </div>
              </div>
              
            </div>

            </>
        )
    }
}
