import React, { Component } from "react";
import "./Compiler.css";
import history from './../../../history';

export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem('input')||``,
      output: ``,
      language_id:localStorage.getItem('language_Id')|| 'cpp',
      user_input: ``,
      studentId : '',
      examName : '', 
      examType : '',
      question : '',
      startTime : '',
      endTime : '',
      attendedTime : '',
      marksObtained : '',
      totalMarks : '',
      percentageObtained : '',
      compileCase : '1',
    };
  }

  componentWillMount(){
    const states = this.props.location.state;

    this.setState({studentId : states[0], examName : states[1], examType : states[2], question : states[3], startTime : states[4], endTime : states[5],
    attendedTime : states[6], marksObtained : states[7], totalMarks : states[8], percentageObtained : states[9]});
 }

  input = (event) => { 
    event.preventDefault();
    this.setState({ input: event.target.value });
    localStorage.setItem('input', event.target.value) 
  };
  
  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };
  
  language = (event) => {  
    event.preventDefault();
    this.setState({ language_id: event.target.value });
    localStorage.setItem('language_Id',event.target.value)

  };
  changeStateToCompileAndRun = (event) => {

    this.setState({compileCase : '1'}, function()  {
      this.submit();
  });

  }

  changeStateTorunOnAllTestCases = (event) => {

    this.setState({compileCase : '2'}, function()  {
        this.submit();
    });

}

changeStateToSubmit = (event) => {

  this.setState({compileCase : '3'}, function()  {
    this.submit();
});
   
}

  submit = async (event) => {

    const sendOptions = {
      method : "POST",
      headers : {
         "content-Type" : "application/json"
      },
      body : JSON.stringify({
         studentId : this.state.studentId, examName : this.state.examName
      })
    }
   
    const checkifTestAlreadyAttended = await fetch('/searchTestUsingIdAndName', sendOptions)
   .then(function(checkifTestAlreadyAttended) {
      return checkifTestAlreadyAttended.json();
    })
    
    if(checkifTestAlreadyAttended[0].marksObtained != '-1')
    {
        alert('You have already submitted this test');
    }
    else
    {
        if(this.state.compileCase == '2' || this.state.compileCase == '3')
        {
          const requestOptionsForInputs = {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              inputFileName : 'input',
          
            }),
        }

        const ReceivedInputs = await fetch('/getInputTestCases', requestOptionsForInputs)
        .then(function (response) {
          return response.json();
        })

        this.setState({user_input : ReceivedInputs.input});
      }

      const val = '';
      let outputText = document.getElementById("output");
      outputText.innerHTML = "";
      outputText.innerHTML += "Compiling ...\n";
      outputText.innerHTML += "Running ...\n";
      const requestOptions = {
        
          method: "POST",
          header : {
            'Access-Control-Allow-Origin' : 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
          body: JSON.stringify({
            code: this.state.input,
            language: this.state.language_id,
            input: this.state.user_input,
          
          }),
      }
      const response = await fetch('/.netlify/functions/enforceCode', requestOptions)
      .then(function (response) {
        return response.json()
      })
      const curOutput = response.output;
     
      let count = 0;
      if(this.state.compileCase == '1')
          outputText.innerHTML += curOutput;
      else
      {
        const Options = {
            method : "POST",
            headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            output : curOutput
        }),        
      }

      const checkTestCases = await fetch('/runTestCases', Options)
      .then(function(checkTestCases) {
        return checkTestCases.json()
      })
      
        outputText.innerHTML += "\n";
        if(checkTestCases == true)
        {
            outputText.innerHTML += "All Test cases passed !";
            count++;
         }
        else
        {
            outputText.innerHTML += "Try Again ! All TestCases didn't pass";
        }
      }

      if(this.state.compileCase == '3')
      {
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-"  + currentdate.getDate() + ','
                          + currentdate.getHours() + ":"  + currentdate.getMinutes() + ' IST';
         
        count *= this.state.totalMarks;
        this.setState({attendedTime : datetime});

        const testDetails = {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            studentId : this.state.studentId, examName : this.state.examName, examType : this.state.examType, startTime : this.state.startTime, 
            endTime : this.state.endTime, attendedTime : this.state.attendedTime, marksObtained : count, totalMarks : this.state.totalMarks
         }), 
        }
 
        const resultAfterSavingFile = await fetch('/updateMarks', testDetails)
          .then(function(resultAfterSavingFile) {
             return resultAfterSavingFile.json()
        })

        alert('Test has been successfully submitted !')
      }
    }
 };

 render() { 
  return (
    <>
      <div class="divide lleft">
      <div>
          <label htmlFor="solution ">

              <h2>Question : </h2><p>{this.state.question}</p>
              </label>
              <i className="fas fa-code fa-fw fa-lg"></i> <h3>Code Section</h3>
              </div>

              <div>
         
          <textarea
            required
            name="solution"
            id="source"
            onChange={this.input}
            className=" source"
            value={this.state.input}
          ></textarea>
          </div>
    </div>

    <div class="divide rright">
        
        <h2>Output</h2>
        <div>
            <textarea id="output" placeholder = 'Output Section'></textarea>
          </div>

          <div class = 'otherThatOutput'>
        <label htmlFor="tags" className="mr-1">
            <b className="heading">Language </b> &nbsp; &nbsp; &nbsp;
          </label>
          <select
            value={this.state.language_id}
            onChange={this.language}
            id="inputBox"
            className="form-control form-inline mb-2 language"
          >
            <option value="cpp">CPP</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
          </select>
          <br/> <br/>
        
          <button
            id = "buttonHere"
            type="submit"
            className="btn btn-danger ml-2 mr-2 "
            onClick={this.changeStateToCompileAndRun}
          >
            <i className="fas fa-cog fa-fw"></i> Compile and run
          </button> &nbsp;
          <button
            id = "buttonHere"
            type="submit"
            className="btn btn-danger ml-2 mr-2 "
            onClick={this.changeStateTorunOnAllTestCases}
          >
            <i className="fas fa-cog fa-fw"></i> Run testcases
          </button> &nbsp; &nbsp; &nbsp; &nbsp;
          

          <button
            id = "submitButtonHere"
            type="submit"
            class ="submitButton"
            onClick={this.changeStateToSubmit}
          >
            <i className="fas fa-cog fa-fw"></i> Submit
          </button> <br/>

       
        
        <span className="badge badge-primary heading my-2 ">
          <i className="shiftingUserInput"></i> <h2>User Input</h2>
        </span>
        <br />
        <textarea id="input" onChange={this.userInput}></textarea>
      
      </div>
     </div>
   
   
    </>
  );
}
}
