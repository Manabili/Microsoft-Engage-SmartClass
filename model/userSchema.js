const mongoose = require('mongoose');


const examSchema = new mongoose.Schema({
    studentId : {
        type : String,
        required : true
    },
    examName : {
       type : String,
       required : true
    },
    examType : {
        type : String,
        required : true
    },
    question : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    },
    attendedTime : {
        type : String,
        required : true
    },
    marksObtained : {
        type : String,
        required : true
    },

    totalMarks : {
        type : String,
        required : true
    },

    percentageObtained : {
        type : String,
        required : true
    },

})


const Examstorage = mongoose.model('examstorage', examSchema);

module.exports = {Examstorage};
