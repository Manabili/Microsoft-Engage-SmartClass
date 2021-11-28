import React, {Component} from 'react';

import './../../FrontPage.css';
import './createQuestion.css'
export default class createQuestion extends Component {
      
      constructor(props){
          super(props);

          this.state = {
             testName : '',
             testType : '',
             question : '',
             startDate : '',
             startTime : '',
             endDate : '',
             endTime : '',
             totalMarks : ''
          }
      }
      
      handleChange = async(event) => {
           event.preventDefault();

           this.setState({
               [event.target.id] : event.target.value,
           })
      }
      
      handleTestType = async(event) => {  
        event.preventDefault();
        this.setState({ testType: event.target.value });

      };

      onSubmit = async(event) => {
          event.preventDefault();

          if(this.state.startDate == '' || this.state.startTime == '' || this.state.endDate == '' || this.state.endTime == '' || this.state.testName == '' ||
          this.state.testType == '' || this.state.question == '' || this.state.totalMarks == '')
              alert('Please Fill all the Fields. All fields are required.');
          else
          {
             let startDateTime =  this.state.startDate + ', ' + this.state.startTime + ' IST';
             let endDateTime =  this.state.endDate + ', ' + this.state.endTime + ' IST' ;

             for(var x = 1; x <= 5; x++)
             {
                    var requestOptions = {
                    method : "POST",
                    headers : {
                      "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                      studentId : x, examName : this.state.testName, examType : this.state.testType, question : this.state.question, startTime : startDateTime,
                      endTime : endDateTime, attendedTime : '0', marksObtained : '-1', totalMarks : this.state.totalMarks, percentageObtained : '0'
                  }),        
                  }
          
                  const response = await fetch('/registerExamDetails', requestOptions)
                  .then(function(response) {
                    return response.json()
                  })

             }
             
             alert('Test/Assignment has been created successfully !');
          }
      }
      render() {
          return (
            <div className = 'forAllClass'>
           
              <div>
                 
                 <h2>Create Test Section </h2>
                <textarea class = 'textAreaCSS2' id = 'testName' placeholder = 'Exam Name' onChange = {this.handleChange}></textarea> <br/>
                
                <p>
            
                <input class = 'input' id = 'totalMarks' placeholder = 'Total Marks' type = 'text' onChange = {this.handleChange}></input>
                </p>

                <b className="heading"><i>Select Test Type</i></b> &nbsp; &nbsp; 
                
                <select className = 'selectClass' id = 'testType' onChange={this.handleChange}>
                   <option value = 'selecthere'>Select</option>
                   <option value = 'Code'>Code</option>
                   <option value = 'Written'>Written</option>
                   <option value = 'Typed'>Typed</option>
                   <option value = 'MCQ'>MCQ</option>
                </select>
                </div> <br/>
                <textarea class = 'textAreaCSS1' id = 'question' placeholder = 'Question(In case of MCQ, just paste the link here)' onChange = {this.handleChange}></textarea> <br/>
                 
               <p>
               <label htmlFor="tags" className="mr-1">Start Date and Time</label> &nbsp; &nbsp; 
                 <input class = 'date' id = 'startDate' type = 'date' required onChange = {this.handleChange}/>
                 <input class = 'date' id = 'startTime' type = 'time' required onChange = {this.handleChange}/>
                </p>

                <p>
               <label htmlFor="tags" className="mr-1">Ending Date and Time</label> &nbsp; &nbsp; 
                <input class = 'date' id = 'endDate' type = 'date' required onChange = {this.handleChange}/>
                 <input class = 'date' id = 'endTime' type = 'time' required onChange = {this.handleChange}/> <br/><br/>
                <input  id = 'curButton' type = 'button' value = 'Submit' onClick = {this.onSubmit}/> <br/> <br/>
                </p>
            </div>
          )
      }
}
