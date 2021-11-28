import React, {Component} from 'react';
import reactDom from 'react-dom';
import {  BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import history from '../../history';
import './../FrontPage.css';

export default class TclassRoom extends Component {
    
   constructor(props) {
       super(props);
       this.state = {
          exam_id : 0,
          testName : ''
       };
    }

    handleChange = (event) => {
       event.preventDefault();

       this.setState({
          [event.target.value] : event.target.value,
       });
    }

    exam = (event) => {
       event.preventDefault();

       this.setState({exam_id : event.target.value});
    }
    
     render() {
         return(
            <div className = 'forAll'>
              <h1>Create Test !</h1>

              <ul>
                 <input id = 'curButton' className = 'Compiler' type = 'button'  value = 'Write Questions' onClick={() => history.push('/createQuestion')}/>
              </ul>
              
              <ul>
                 <input id = 'curButton' className = "handwritten" type = "button" value = 'Submit Test cases for Codes' onClick={() => history.push('/createTestCase')}></input>
              </ul>

              <ul>
                 <input id = 'curButton' className = "giveMarks" type = "button" value = 'Give/Check Marks' onClick={() =>history.push('/GiveMarks')}></input>
              </ul>

              <br/>
      
              </div>
         );
     }
} 
