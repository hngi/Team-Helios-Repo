import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import users from './routes/users';
import index from './routes/index';
import expenses from './routes/expenses';
import ejs from 'ejs';
import path from 'path';

// require('dotenv').config();
const app = express();
//BODY PARSE
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//CORS
app.use(cors());
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile)

//Set the public folder
app.use(express.static(path.join(__dirname, 'public')));

//CONNECT MONGODB
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}
const uri =
  "mongodb://localhost/fintrack";
mongoose.connect(uri, options)
  .then(connected => console.log(`Database connection established`))
  .catch(err => console.log(`There was an error connecting to database, the err is ${err}`));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use(users);
app.use(index);
app.use(expenses);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;