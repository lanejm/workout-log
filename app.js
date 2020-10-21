require('dotenv').config()
const Express = require ('express');
const app = Express();
const database = require('./db');
database.sync();

app.use(Express.json());

app.use(require('./middleware/headers'));

app.use(Express.static(__dirname + '/public'));
console.log(__dirname);

app.get('/', (request, response) => response.render('index'));

const workout = require('./controllers/workoutcontroller');
app.use('/workout', workout)

const usercontroller = require('./controllers/usercontroller');
app.use('/user', usercontroller)

const logcontroller = require('./controllers/logcontroller');
app.use('/log', logcontroller)

app.listen(process.env.PORT, function() {console.log(`app is listening on port ${process.env.PORT}`)});