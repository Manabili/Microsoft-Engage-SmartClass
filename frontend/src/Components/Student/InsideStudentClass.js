//InsideClassStudent.js
import React, {Component} from 'react';
import reactDom from 'react-dom';
import {  BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import history from '../../history';

import './../FrontPage.css';
import './InsideStudentClass.css';


export default class InsideClassStudent extends Component {
   
   constructor(props) {
      super(props);
      this.state = {
         studentId : '',
    }
   }
   
   handleChange = async(event) => {
      event.preventDefault();

      this.setState({studentId : event.target.value});

   }
   goToTestSection = async(event) => {

      const curstudentId = this.state.studentId;
      
      if(curstudentId == '')
      {
         alert('Please Enter a student Id to proceed')
      }
      else
      {
         let data = [curstudentId]
         return (
  
         this.props.history.push({
            pathname: '/StudentTestSection',
            state : data
           
          })
         )
      }
   }

    render() {
        return (
           <div className = 'forAll'>
           <div class = 'insideCurClass'>
               <input class = 'input1' id = 'studentId' type = 'text' placeholder = 'Student ID' onChange = {this.handleChange}/>
               <ul>
                 <input id = 'curButton' className = 'testSection' type = 'button'  value = 'Assignment/Test Section' onClick={this.goToTestSection}/>
              </ul>
              </div>
           </div>
        
        )
    }
}
