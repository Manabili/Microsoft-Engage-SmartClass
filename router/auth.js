const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

require('../db/conn');
const {Examstorage} = require('../model/userSchema');


//define storage for files

const storage1 = multer.diskStorage({
    destination : function (request, file, callback) {
        callback(null, './storeUploadedFiles');
    },
    
    filename : function(request, file, callback) {
        callback(null, file.originalname);
    },

});

const storage2 = multer.diskStorage({
    destination : function (request, file, callback) {
        callback(null, './storeTestCases');
    },
    
    filename : function(request, file, callback) {
        callback(null, file.originalname);
    },

});

const upload1 = multer({

    storage : storage1,

    limits : {
        fileSize : 1024 * 1024 * 16
    }
});

const upload2 = multer({

    storage : storage2,

    limits : {
        fileSize : 1024 * 1024 * 16
    }
});


router.post('/textFileSubmission', async(req, res) => {

    const {name, text} = req.body;
    
    const path = './storeUploadedFiles';
    const fileName = path + '/' + name + '.txt';

    fs.writeFile(fileName, text, function(err) {
        if(err)  throw err;
    });
    res.send('NewFile has been created successfully');
 });

 
router.post('/uploadFiles', upload1.single('choosenFile'),async(req, res) => {

    const choosenFile = req.file.filename;
    
    if(upload1.single('choosenFile')){
        res.status(201).json({message : 'File has been successfully stored'});
    }
    else 
    { 
        res.status(500).json({error : "Failed to register"});
    }  

});

router.post('/storeTestCaseFiles', upload2.single('choosenFile'),async(req, res) => {
    
    const choosenFile = req.file.filename;

    if(upload2.single('choosenFile')){
        res.status(201).json({message : 'File has been successfully stored'});

    }
    else 
    { 
        res.status(500).json({error : "Failed to register"});
    }  
});

router.post('/getInputTestCases', async(req, res) => {
    
    const path = './storeTestCases';
    const fileName = path + '/' + req.body.inputFileName + '.txt';

    let input = fs.readFileSync(fileName, function(err, data) {
        if (err) throw err;
    });
    
    res.send({'input' : input.toString()});
})

router.post('/runTestCases', async(req, res) => {
    
    let curOutput = req.body.output;

    const path = './storeTestCases';

    const fileName1 = path + '/' + 'output.txt';

    
    let storedOutput = fs.readFileSync(fileName1, 'utf-8')
    storedOutput = storedOutput.replace(/\r?\n|\r/g, " * ");
    curOutput = curOutput.replace(/\r?\n|\r/g, " * ");

    res.send(storedOutput === curOutput);

});

router.post('/registerExamDetails', (req, res) => {
       
       var {studentId, examName, examType, question, startTime , endTime, attendedTime, marksObtained, totalMarks, percentageObtained} = req.body;

       if(percentageObtained == 0 && marksObtained != -1)
             percentageObtained = (marksObtained * 100 ) / (totalMarks);
       
       const examstorage = new Examstorage({studentId, examName, examType, question, startTime, endTime, attendedTime, marksObtained, totalMarks, percentageObtained});

       examstorage.save().then(() => {
           res.status(201).json({message : "Test Details has been added successfully !"});
           
       }).catch((err) => res.status(500).json({error : "Failed to store file"}));
     
});

router.post('/getUnmarkedPastTests', (req, res) => {

    const {studentId} = req.body;
    Examstorage.find({studentId : studentId}).where({marksObtained : -1}).then((result) => {
        res.json(result);
    })

});

router.post('/searchTestUsingIdAndName', (req, res) => {

    const {studentId, examName} = req.body;
    Examstorage.find({studentId : studentId, examName : examName}).then((result) => {
        res.json(result);
    })

});

router.post('/updateMarks', (req, res) => {
    
    const {studentId, examName, examType, startTime, endTime, attendedTime, marksObtained, totalMarks} = req.body;
    
    var percentageObtained = (marksObtained * 100) / totalMarks;

    const query = {studentId, examName, examType, startTime, endTime};
    const newValues = {attendedTime, marksObtained, percentageObtained};

    Examstorage.updateOne(query, newValues, function(err, res) {
        if (err) throw err;
      });

      Examstorage.find({studentId : studentId, examName : examName}).then((result) => {
    })
      res.status(200).json({message : "Document updated successfully !"});
 });

router.post('/getAllTestMarks', async(req, res) => {
    
    const {studentId} = req.body;

    Examstorage.find({studentId : studentId}).then((result) => {
        res.status(244).json(result);
    }).catch((err) => res.status(404).json({error : "Couldn't load Files"}));
})

module.exports = router;
