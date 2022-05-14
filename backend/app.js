const express = require('express');
const app = express();
const globalErrorHandler = require('./controllers/errorController');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const authRouter = require('./routes/authRouter');
const morgan = require('morgan');
const cors = require('cors');
const env = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
env.config({ path: 'backend/.env' });
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
const path = require('path'); //*to be able to find ve main path
app.use('/public', express.static(path.join(__dirname, 'uploads'))); //*__dirname give as backend folder
app.use(morgan('tiny'));
//app.use(cors());  allow access to api from all domains
if (process.env.NOD_ENV === 'DEVELOPMENT') {
  app.use(cors({ origin: 'http://localhost:3000' }));
}
app.use('/api/v1', categoryRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', cartRouter);
app.use('/api/v1/user', authRouter);

app.use(globalErrorHandler);
module.exports = app;
