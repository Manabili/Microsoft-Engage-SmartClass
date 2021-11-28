import React, {Component} from 'react';
import reactDom from 'react-dom';
import {  BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import history from './../../../history';
import './giveMarks.css';
import './../../FrontPage.css';

export default class GiveMarks extends Component {
    constructor(props) {
       super(props);
       this.state = {
         updatedMarks : '',
         testNotDone : 0,
         studentID1 : '',
         studentID2 : '',
       };
    }

    handleChange = (event) => {
       event.preventDefault();

       this.setState({
          [event.target.id] : event.target.value,
       });
    }
    
   checkNoofTestLeftToEvaluate = async(event) => {

      event.preventDefault();
      let pastTestPrint = document.getElementById('pastTest');
      pastTestPrint.innerHTML = "";

      const requestOptions = {
         method : "POST",
         headers : {
            "Content-type" : "application/json"
         },
         body : JSON.stringify({
            studentId : this.state.studentID1
         })
      }
      const response = await fetch('/getUnmarkedPastTests', requestOptions)
      .then(function (response) {
        return response.json()
      })
       
      if(response.length == 0)
      {
         alert('All tests are evaluated for the current student.')
         document.getElementById('Command').innerHTML = 'Stop.';
      }
      else
      {
         pastTestPrint.innerHTML += "List of Test that are yet to evaulate  " + "<br>";
         for(var index = 0; index < response.length; index++)
             pastTestPrint.innerHTML += "<li>" + "<b>" + response[index].examName +  "</b>" + "</li>" ;
      }
   }

   onSubmit = async(event) => {
    
      event.preventDefault();

      const requestOptions = {
         method : "POST",
         headers : {
            "content-Type" : "application/json"
         },
         body : JSON.stringify({
            studentId : this.state.studentID2, examName : this.state.testName
         })
      }
      
      const returnedUnmarkedTest = await fetch('/searchTestUsingIdAndName', requestOptions)
      .then(function(returnedUnmarkedTest) {
         return returnedUnmarkedTest.json();
      })
      
      if(returnedUnmarkedTest.length == 0)
      {
         alert('No database exists for entered inputs ! Please Enter Valid inputs');
      }
      else
      {
         const { studentId, examName, examType, startTime, endTime, attendedTime, totalMarks} = returnedUnmarkedTest[0];

         const marksObtained = this.state.updatedMarks;
      
         const updatedDetails = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                studentId, examName, examType, startTime, endTime, attendedTime, marksObtained, totalMarks
            }), 
        }
      
         const updateDatabase = await fetch('/updateMarks', updatedDetails)
          .then(function(updateDatabase) {
             return updateDatabase.json();
         })
   
         alert(updateDatabase.message);

      }
      
   };

   render() {
      return(
         <div className = 'forAll'>
            <h1>Assign/Update Marks !</h1>
              
            <h2>Past tests copies which are yet to assign marks will be available here. Click the button to check</h2>
              
            &nbsp;&nbsp;&nbsp;<input class = 'input' type = 'text' id = 'studentID1' placeholder = 'Scholar id' onChange = {this.handleChange} /> <br /> <br />
            <input id = 'curButton' type = 'button' value = 'Submit' onClick = {this.checkNoofTestLeftToEvaluate} /> <br /> <br/>
            

            <h3>Assign/Update Marks here</h3>
            <p id = 'pastTest'></p>
           

            <input class = 'input' type = 'text' id = 'studentID2'  placeholder = 'Scholar Id' onChange = {this.handleChange} /> <br /> <br />

            <input class = 'input' type = 'text' id = 'testName'  placeholder = 'Test Name' onChange = {this.handleChange} /> <br /> <br />
            
            <input  class = 'input' type = 'text' id = 'updatedMarks'  placeholder = 'Updated Marks' onChange = {this.handleChange} /> <br /> <br />
            <input id = 'curButton' type = 'button' value = 'Submit' onClick = {this.onSubmit} />

            <p id = 'Command'></p>
         </div>

         );
     }
} 
