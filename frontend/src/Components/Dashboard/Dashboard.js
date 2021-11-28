import React, {Component} from 'react';
import reactDom from 'react-dom';
import {  BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import history from '../../history';
import {PolarArea, Line, Bar, Pie, Doughnut} from 'react-chartjs-2';
import './Dashboard.css';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
);



export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          studentID : '-1',
          avrGrade : '',
          graphData : '',
          chartData1 : {
            labels : [],
            datasets : [
            {
                index : 'Rating',
                data : [0,0,0,0,0],
             }]},
          chartData2 : {
            labels : [],
            datasets : [
            {
                index : 'Rating',
                data : [0,0,0,0,0],
             }]},
          chartData3 : {
            labels : [],
            datasets : [
            {
                index : 'Rating',
                data : [0,0,0,0,0],
             }]},
          chartData4 : {
            labels : [],
            datasets : [
            {
                index : 'Rating',
                data : [0,0,0,0,0],
             }]},
          chartData : {
            labels : [],
            datasets : [
            {
                index : 'Rating',
                data : [0,0,0,0,0],
             }]}, 
             options: {
                maintainAspectRatio : false, 
                plugins: {
                    title: {
                        display: true,
                        text: 'CODING CODING !'
                    }
                }
            }
    }
}

createNewChart = (labels, data, colorArr, borderArr) => {

    let ctx = "bar_l1_chart";

    const newChart = {
        labels: labels,
        datasets: [{
            index : 'Rating',
            data: data,
            backgroundColor : colorArr,
            borderColor : borderArr,
        }],

    };

    return newChart;
  };


    handleChange = async(event) => {
         
        event.preventDefault();
        this.setState({
            [event.target.id] : event.target.value,
        })
    }
    
    onSubmit = async(event) => {

        let pastTests = document.getElementById('showpastTesthere');
        pastTests.innerHTML = '';
        document.getElementById('testWisePercentage').innerHTML = '';
        document.getElementById('testWiseGrade').innerHTML = '';
        document.getElementById('avgGrade').innerHTML = '';
        document.getElementById('avgPercentage').innerHTML = '';
        document.getElementById('totalTests').innerHTML = ' ';
        document.getElementById('totalAttendedTests').innerHTML = '';
        
        const studentId = this.state.studentID;

        const requestOptions = {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            studentId
        }),        
        }

        const response = await fetch('/getAllTestMarks', requestOptions)
        .then(function(response) {
          return response.json()
        })
        
        document.getElementById('totalTests').innerHTML += "Total No of Test conducted : " + response.length + "<br>";
        
        
        if(response.length> 0)
           pastTests.innerHTML += "<tr>" + "<b>" + "<th>" + "Exam Name" + "</th>" + "<th>" + "Exam Type" + "</th>" + "<th>" + "&nbspMarks Obtained&nbsp"  + "</th>" + 
"<th>" + "Total Marks" + "</th>" + "<th>" + "Percentage" + "</th>" + "<th>" + "Time of Exam" + "</th>" + "</b>" + "<br>"; 
        
        let mcqDatesArr = [], mcqMarksArr = [], codingDatesArr = [], codingMarksArr = [], writtenDatesArr = [], writtenMarksArr = [], typedDatesArr = [], typedMarksArr = [];
        
        let colorMCQ = [], borderMCQ = [], colorCoding = [], borderCoding = [], colorWritten = [], borderWritten = [], colorTyped = [], borderTyped = [];
        var codingMarks = 0, mcqMarks = 0, writtenMarks = 0, totalCodingTest = 0, totalMcqTest = 0, totalWrittenTest = 0, totalTypedTest = 0, typedMarks = 0;
        for(var index = 0; index < response.length; index++)
        {
              var testType = response[index].examType;
              var testMarks = response[index].marksObtained;
              var testPercentage = parseFloat(response[index].percentageObtained);
              
              if(testMarks == -1)
                 continue;
              
              var numTestMarks = testPercentage;

              pastTests.innerHTML += "<tr>" + "<th>" + response[index].examName + "</th>" + "<th>" + response[index].examType + "</th>" + "<th>" + response[index].marksObtained  + "</th>" + 
              "<th>" + response[index].totalMarks + "</th>" + "<th>" + response[index].percentageObtained + "%" + "</th>" + "<th>" + response[index].startTime + "</th>" + "<br>";


              if(testType == "MCQ")
              {
                  mcqMarks +=  testPercentage;
                  totalMcqTest++;
                  mcqDatesArr.push(response[index].startTime);
                  mcqMarksArr.push(testPercentage);

                  if(numTestMarks >= 80)
                  {
                      colorMCQ.push('green');
                      borderMCQ.push('green');
                  }
                  else if(numTestMarks >= 60)
                  {
                    colorMCQ.push('blue');
                    borderMCQ.push('blue');                      
                  }
                  else if(numTestMarks >= 40)
                  {
                    colorMCQ.push('orange');
                    borderMCQ.push('orange');                      
                  }
                  else
                  {
                    colorMCQ.push('red');
                    borderMCQ.push('red');                      
                  }
              }
              if(testType == "Code")
              {
                  codingMarks += testPercentage;
                  totalCodingTest++;
                  codingDatesArr.push(response[index].startTime);
                  codingMarksArr.push(testPercentage);

                  if(numTestMarks >= 80)
                  {
                      colorCoding.push('green');
                      borderCoding.push('green');
                  }
                  else if(numTestMarks >= 60)
                  {
                    colorCoding.push('blue');
                    borderCoding.push('blue');                      
                  }
                  else if(numTestMarks >= 40)
                  {
                    colorCoding.push('orange');
                    borderCoding.push('orange');                      
                  }
                  else
                  {
                    colorCoding.push('red');
                    borderCoding.push('red');                      
                  }
              }
              if(testType == "Written")
              {
                  writtenMarks += testPercentage;
                  totalWrittenTest++;
                  writtenDatesArr.push(response[index].startTime);
                  writtenMarksArr.push(testPercentage);
                  
                  if(numTestMarks >= 80)
                  {
                      colorWritten.push('green');
                      borderWritten.push('green');
                  }
                  else if(numTestMarks >= 60)
                  {
                    colorWritten.push('blue');
                    borderWritten.push('blue');                      
                  }
                  else if(numTestMarks >= 40)
                  {
                    colorWritten.push('orange');
                    borderWritten.push('orange');                      
                  }
                  else
                  {
                    colorWritten.push('red');
                    borderWritten.push('red');                      
                  }
              }

              if(testType == "Typed")
              {
                  typedMarks += testPercentage;
                  totalTypedTest++;
                  typedDatesArr.push(response[index].startTime);
                  typedMarksArr.push(testPercentage);
                  if(numTestMarks >= 80)
                  {
                      colorTyped.push('green');
                      borderTyped.push('green');
                  }
                  else if(numTestMarks >= 60)
                  {
                    colorTyped.push('blue');
                    borderTyped.push('blue');                      
                  }
                  else if(numTestMarks >= 40)
                  {
                    colorTyped.push('orange');
                    borderTyped.push('orange');                      
                  }
                  else
                  {
                    colorTyped.push('red');
                    borderTyped.push('red');                      
                  }
              }
        }

        const response1 = this.createNewChart(mcqDatesArr, mcqMarksArr, colorMCQ, borderMCQ);
        const response2 = this.createNewChart(codingDatesArr, codingMarksArr, colorCoding, borderCoding);
        const response3 = this.createNewChart(writtenDatesArr, writtenMarksArr, colorWritten, borderWritten);
        const response4 = this.createNewChart(typedDatesArr, typedMarksArr, colorTyped, borderTyped);
        
        this.setState({chartData1 : response1});
        this.setState({chartData2 : response2});
        this.setState({chartData3 : response3});
        this.setState({chartData4 : response4});
  
        var totalTestsAttended = totalMcqTest + totalCodingTest + totalWrittenTest + totalTypedTest;

        document.getElementById('totalAttendedTests').innerHTML += "Total Attended Test :  " + totalTestsAttended + "<br>";
        
        var avgMcqMarks = mcqMarks / totalMcqTest;
        var avgCodingMarks = codingMarks / totalCodingTest;
        var avgWrittenMarks = writtenMarks/ totalWrittenTest;
        var avgTypedMarks = typedMarks / totalTypedTest;
        
        var totalTestType = (totalMcqTest > 0 ? 1 : 0) + (totalCodingTest > 0 ? 1 : 0) + (totalWrittenTest > 0 ? 1 : 0) + (totalTypedTest > 0 ? 1 : 0);
        var totalTestMarks = (Number.isNaN(avgMcqMarks) ? 0 : avgMcqMarks) + (Number.isNaN(avgCodingMarks) ? 0 : avgCodingMarks) + 
                             (Number.isNaN(avgWrittenMarks) ? 0 : avgWrittenMarks) + (Number.isNaN(avgTypedMarks) ? 0 : avgTypedMarks);

        var avgPercentage = totalTestMarks / totalTestType;
        
        if(Number.isNaN(avgPercentage))
        {
            this.setState({avgGrade : ''});
        }
        if(avgPercentage >= 95)
        {
            this.setState({avrGrade : 'A++'});
        }
        else if(avgPercentage >= 90)
        {
            this.setState({avrGrade : 'A+'});
        }
        else if(avgPercentage >= 80)
        {
            this.setState({avrGrade : 'A'});
        }
        else if(avgPercentage >= 70)
        {
            this.setState({avrGrade : 'B+'});
        }
        else if(avgPercentage >= 60)
        {
            this.setState({avrGrade : 'B'});
        }
        else if(avgPercentage >= 50)
        {
            this.setState({avrGrade : 'C+'});
        }
        else if(avgPercentage >= 40)
        {
            this.setState({avrGrade : 'C'});
        }
        else if(avgPercentage < 40)
        {
            this.setState({avrGrade : 'D'});
        }
        document.getElementById('avgPercentage').innerHTML += "Overall Percentage : " + (Number.isNaN(avgPercentage) ? "No exam conducted/attended" : avgPercentage + ' %') + "<br>";

        document.getElementById('testWisePercentage').innerHTML += "<b>" + "Average percentage in MCQ : " + (Number.isNaN(avgMcqMarks) ? "No exam conducted/attended" : avgMcqMarks + ' %') + "</b>" + "<br>";
        document.getElementById('testWisePercentage').innerHTML += "<b>" + "Average percentage in Coding : " + (Number.isNaN(avgCodingMarks) ? "No exam conducted/attended" : avgCodingMarks + ' %') + "</b>" + "<br>";
        document.getElementById('testWisePercentage').innerHTML += "<b>" + "Average percentage in Written : " + (Number.isNaN(avgWrittenMarks) ? "No exam conducted/attended" : avgWrittenMarks + ' %') + "</b>" + "<br>";
        document.getElementById('testWisePercentage').innerHTML += "<b>" + "Average percentage in Typed : " + (Number.isNaN(avgTypedMarks) ? "No exam conducted/attended" : avgTypedMarks + ' %') + "</b>" + "<br>";
    }
    render() {
        return (
           <div class = 'curClassName1'>
               <br />
               <h1><b>Student Dashboard</b></h1><br />
               <input class = 'input' type = 'text' id = 'studentID' onChange = {this.handleChange}/>

               <input id = 'dasboardButton' type = 'button' value = 'Submit' onClick = {this.onSubmit} />
               
               
               <h2 id = 'avgGrade'>Overall Grade </h2>
               <h2 id = 'avgPercentage'>Overall percentage </h2>
              
            
               <h2>Overall Grade TestWise
               <div class = 'circle'>{this.state.avrGrade}</div>
               </h2>
               <p id = 'testWiseGrade'></p>

               <h2>Overall percentage TestWise</h2>
               <p id = 'testWisePercentage'></p>
               
               <h2 id = 'totalTests'>Total no of Test : </h2>
               
               <h2 id = 'totalAttendedTests'></h2>
               <table id = 'showpastTesthere'></table>
               
               <h2>Graph Section </h2>
               <div class = 'temp'>
               <div className = 'chart'>
               <label><h3>MCQ</h3></label>
               <div>
                   
         <Bar data = {this.state.chartData1} options = {{maintainAspectRatio : false}} />
               </div>
                
               <label><h3>Coding</h3></label>
               <div>
         <Bar data = {this.state.chartData2} options = {{maintainAspectRatio : false}} />
               </div>
               
               <label><h3>Written</h3></label>
               <div>
         <Bar data = {this.state.chartData3} options = {{maintainAspectRatio : false}} />
               </div>
               
               <label><h3>Typed</h3></label>
               <div>
         <Bar data = {this.state.chartData4} options = {{maintainAspectRatio : false}} />
               </div>

               </div>
                     
           </div>
           </div>
        
        )
    }
}
