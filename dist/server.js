const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const passport = require('./config/passport');

const users = require('./routes/users');

const index = require('./routes/index');

const expenses = require('./routes/expenses');

const ejs = require('ejs');

const path = require('path');

const expressValidator = require('express-validator');

const session = require('express-session');

const flash = require('express-flash'); // require('dotenv').config();


const app = express(); //BODY PARSE

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //CORS

app.use(flash());
app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1209600000
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile); //Set the public folder

app.use(express.static(path.join(__dirname, 'public'))); //CONNECT MONGODB

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
const uri = "mongodb://fintrack:fintrack12345@ds153412.mlab.com:53412/fintrack";
mongoose.connect(uri, options).then(connected => console.log(`Database connection established`)).catch(err => console.log(`There was an error connecting to database, the err is ${err}`)); // Passport middleware

app.use(passport.initialize());
app.use(passport.session()); // Routes

app.use(users);
app.use(index);
app.use(expenses);
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map