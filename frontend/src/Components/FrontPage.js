import React, { Component }  from 'react';
import ReachDOM from 'react-dom';
import { BrowserRouter, Router, Route, Switch, NavLink } from 'react-router-dom';

import './FrontPage.css';

import { useHistory } from "react-router-dom";


function FrontPage() {
   

   const history = useHistory();

    return (
       
       <div className="forAll">

       <div className = "classhere">
          <h1 id = 'header1' style = {{color : "Green", marginTop : "10px", fontSize : "70px"}}>CLASSROOM</h1>
       
       <div> <br/>
        <input type = 'button' value = 'Home' id = 'curButton' onClick = {() => history.push('/')}/>
        <br /> <br /> <br />

        <input type = 'button' value = "Teacher's Section" id = 'curButton' onClick = {() => history.push('/InsideTeacherClassRoom')}/>
        &nbsp; &nbsp; &nbsp; 
        
        <input type = 'button' value = "Student's Section" id = 'curButton' onClick = {() => history.push('/InsideStudentClass')}/>
        &nbsp; &nbsp; &nbsp; <br /> <br /> <br />
        
        <input type = 'button' value = 'Dashboard' id = 'curButton' onClick = {() => history.push('/Dashboard')}/>
        &nbsp; &nbsp; &nbsp;
       

        </div>
       </div>      
       </div>
    );
   
}

export default FrontPage;
