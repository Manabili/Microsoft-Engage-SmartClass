const mongoose = require('mongoose');

const DB = process.env.DATABASE;
const PORT = process.env.PORT;

mongoose.connect(DB).then(() => {
}).catch((err) => console.log('No connection !Error'));
