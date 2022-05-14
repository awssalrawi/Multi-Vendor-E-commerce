const AppError = require('../utilities/appError');

const handleCostErrorDB = (err) => {
  const message = `invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

  const value = err.errmsg.match(/(?:"[^"]*"|^[^"]*$)/);

  const message = `Duplicate field value: ${value[0]}, Please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data.${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJwtError = () =>
  new AppError('Invaild token ,Please Login again!', 401);

const handleJwtExpiredError = () =>
  new AppError('Token expired, Please login again', 401);

const sendErrorDev = (err, req, res) => {
  //*ApI
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  //*ApI
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperation) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.error('Error', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something went very Wrong',
    });
  }

  //*Programming or other unknown errors
  console.error('Error', err);
};

module.exports = (err, req, res, next) => {
  console.log('Iam in global error function');
  //console.log(err.stack);
  //! with this four parameters express will automatically knows that this entire function are error handling function
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'PRODUCTION') {
    console.log('error');
    let error = Object.assign(err);
    if (error.name === 'CastError') error = handleCostErrorDB(error); //for get tour
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJwtError();
    if (error.name === 'TokenExpiredError') error = handleJwtExpiredError();
    console.log('anathor place');
    sendErrorProd(error, req, res);
  }
};
