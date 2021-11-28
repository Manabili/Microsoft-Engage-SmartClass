import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter, Router, Route, Switch, NavLink } from 'react-router-dom';

import FrontPage from './Components/FrontPage';
import StudentTestSection from './Components/Student/StudentTestSection';
import Compiler from './Components/Student/Compiler/Compiler';
import UploadSec from './Components/Student/UploadSec/UploadSec';
import Mcq from './Components/Student/Mcq/Mcq';
import InsideStudentClass from './Components/Student/InsideStudentClass';
import Typing from './Components/Student/Typing/Typing';
import Dashboard from './Components/Dashboard/Dashboard';

import InsideTeacherClassRoom from './Components/Teacher/InsideTeacherClassRoom';

import createQuestion from './Components/Teacher/createQuestion/createQuestion';
import createTestCase from './Components/Teacher/createTestCase/createTestCase';
import GiveMarks from './Components/Teacher/giveMarks/giveMarks';
import history from './history';
import './App.css'

export default class App extends Component {
  render() {
    return (  
       <Router history={history}>
         
         <BrowserRouter>
          <Switch>
            <Route path="/" component={FrontPage} exact/>

            <Route path="/StudentTestSection" component={StudentTestSection } />

            <Route path="/Compiler" component={Compiler} />

            <Route path="/UploadSec" component={UploadSec} />

            <Route path="/Mcq" component={Mcq} />
            
            <Route path="/InsideStudentClass" component={InsideStudentClass} />

            <Route path='/Typing' component={Typing} />
           
            <Route path="/Dashboard" component={Dashboard} />

            <Route path="/InsideTeacherClassRoom" component={InsideTeacherClassRoom} />

            <Route path="/createTestCase" component={createTestCase} />

            <Route path="/createQuestion" component={createQuestion} />

            <Route path="/GiveMarks" component={GiveMarks} />
            
          </Switch>
          </BrowserRouter>
  
         </Router>
    );
   }
}

