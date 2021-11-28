import axios from 'axios';
import React, {Component} from 'react';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';

import './Mcq.css';
import history from './../../../history';

export default class MCQ extends Component {

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

    render() {
        return (
            <div>
            
            <div>
              <div class = ''>

             <p>Question will appear here !</p>
                <a href = {this.state.question} target="_blank">Test Link !</a> 
               </div>
            </div>
           
              <div>

              </div>
            </div>
        )
    }
}
