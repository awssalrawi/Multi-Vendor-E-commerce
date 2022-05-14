// module.exports = (fun) => {
//   console.log('visited catchAsync function');
//   return (req, res, next) => {
//     fun(req, res, next).catch((err) => next(err));
//   };
// };
module.exports = (func) => (req, res, next) => {
  console.log('visited catchAsync function');
  return Promise.resolve(func(req, res, next)).catch((err) => next(err));
};
