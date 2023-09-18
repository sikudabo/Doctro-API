const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const http = require('http');
const logger = require('morgan');
const { AnswerQuestion } = require('./api');

app.set('appName', 'DoctroAPI');
app.set('port', process.env.PORT || 3018);

app.use(cookieParser());
app.use(logger('dev'));
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(({ extended: true })));
app.use(cors());

app.use(AnswerQuestion);


app.get('/', (req, res) => {
    res.status(200).json({ status: 'running', message: 'Welcome to the Doctro API!' });
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server listening on port:', app.get('port'));
});

// Catch uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
});


