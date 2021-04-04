import routes from './src/routes/routes';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

var app = express();
app.use(express.static(__dirname));
const port = 3400;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/records', { useNewUrlParser: true, useUnifiedTopology: true});

// bodyParser setup 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

routes(app);

// app.get('/', (req,res) => {
//     res.send(`Node and express running on port  ${port}`);
// })
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
