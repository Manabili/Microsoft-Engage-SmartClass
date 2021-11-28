import axios from 'axios';
import React, {Component} from 'react';
import {useState} from 'react';
import './Typing.css';
import history from './../../../history';

export default class Typing extends Component {

    constructor(props){
        super(props);
      
        this.state = {
          name : '' ,
          text :  '',
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

    onSubmittingFile = async(event) => {
         event.preventDefault();

         const {name , text} = this.state;

         const requestOptions = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, text
            }),

         }
         if(name == '' || text == '')
         {
             alert('All fields are mandatory. Please fill all the fields.');
         }
         else
         {
           const response = await fetch('/textFileSubmission', requestOptions)
           .then(function(response) {
              alert('File has been stored Succesfully');
              return response.json();
          });
         
          const response1 = await fetch('/printSubmittedFile',{
             headers : { 
                'Accept': 'application/json'
            }
          })
          .then(function(response1) {
             return response1.json();
          });
        }

    }

    render() {
        return (
            <div>
            
            <div class = 'split left'>
              <div class = 'centered'>

                <p><b>Question &nbsp; : </b> &nbsp;&nbsp; {this.state.question} </p>
                
                 <textarea id = 'name' placeholder = 'File Name(Just Enter the name, do not add any extension)' onChange = {this.handleChange}></textarea>
                <textarea id = 'text' placeholder = 'Write Answer here' onChange={this.handleChange}></textarea> 
                <input id = 'button1' type = 'button' value = 'Submit' onClick = {this.onSubmittingFile} />
               </div>
            </div>
           
              <div>

              </div>
            </div>
        )
    }
}
