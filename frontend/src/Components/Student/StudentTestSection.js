import React, {Component} from 'react';
import reactDom from 'react-dom';
import {  BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import history from '../../history';
import './../FrontPage.css';
import './StudentTestSection.css';

export default class StudentTestSection extends Component {

   constructor(props) {
      super(props);
      this.state = {
        studentId : '',
        question : '',
        testType : '',
    }
    
     this.handleChange = this.handleChange.bind(this);
   }
   
   componentWillMount(){
      const curstudentID = this.props.location.state[0];
      this.setState({studentId : curstudentID})
   }

   handleChange = async(event) => {
       
      event.preventDefault();
      this.setState({
          [event.target.id] : event.target.value,
      })
   }

   studentExamDetails = async(event) => {
      
      let printAvailableTest = document.getElementById('availableTest');
      printAvailableTest.innerHTML = '';
      
      const requestOptions = {
         method : "POST",
         headers : {
            "Content-type" : "application/json"
         },
         body : JSON.stringify({
            studentId : this.state.studentId
         })
      }
      const response = await fetch('/getUnmarkedPastTests', requestOptions)
      .then(function (response) {
        return response.json()
      })
      
      if(response.length == 0)
      {
         alert('Congratulations ! You have appeared for all available tests')
      }
      this.setState({returnedResponse : response});

      for(var x = 0; x < response.length; x++)
      {
           printAvailableTest.innerHTML += "<b>" + response[x].examName + "&nbsp;&nbsp;&nbsp;" + response[x].examType + "&nbsp;&nbsp;&nbsp;" + response[x].totalMarks + "</b>" + "<br>";
      }
   }

   goToTestSection = async(event) => {

        const requestOptions = {
         method : "POST",
         headers : {
            "content-Type" : "application/json"
         },
         body : JSON.stringify({
            studentId : this.state.studentId, examName : this.state.testName
         })
      }
      
      const returnedTestDetails = await fetch('/searchTestUsingIdAndName', requestOptions)
      .then(function(returnedTestDetails) {
         return returnedTestDetails.json();
      })
      
      if(returnedTestDetails.length == 0)
      {
          alert('Test Not Found ! Please enter a valid test')
      }
      else
      {
       //studentId, examName, examType, question, startTime , endTime, attendedTime, marksObtained, totalMarks, percentageObtained
       let data = [returnedTestDetails[0].studentId, returnedTestDetails[0].examName, returnedTestDetails[0].examType, returnedTestDetails[0].question, 
         returnedTestDetails[0].startTime , returnedTestDetails[0].endTime, returnedTestDetails[0].attendedTime, returnedTestDetails[0].marksObtained, returnedTestDetails[0].totalMarks, returnedTestDetails[0].percentageObtained]
      

       if(data[2] == 'Written')
       return (
  
       this.props.history.push({
         pathname: '/UploadSec',
         state : data
           
       })
      )
      else if(data[2] == 'Code')
      return (
  
       this.props.history.push({
         pathname: '/Compiler',
         state : data
           
       })
      )
    
      else if(data[2] == 'Typed')
      return (
  
       this.props.history.push({
         pathname: '/Typing',
         state : data
           
       })
      )

      else if(data[2] == 'MCQ')
      return (
  
       this.props.history.push({
         pathname: '/MCQ',
         state : data
           
       })
      )
      }
   }
   render() {
      return(
         <div className = 'forAll'>
             <div class = 'studentTestt'>
              <h2>Check available Tests</h2>
              <input id = 'curButton' type = 'button' value = 'Click here !' onClick = {this.studentExamDetails}/>
              <p id = "availableTest"></p>

              
              <input class = 'input' id = 'testName' type = 'text' placeholder = 'Test Name' onChange = {this.handleChange}/>
              
               <input id = 'curButton' type = 'button' value = 'Go to Test Section' onClick = {this.goToTestSection} />
               </div> 
              <br/>
      
            </div>
         );
     }
} 
