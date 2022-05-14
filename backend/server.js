const app = require('./app');
const mongoose = require('mongoose');

const env = require('dotenv');
env.config({ path: 'backend/.env' });

//*handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error : ${err.message}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log(`Database connected to ${con.connection.host}`))
  .catch(() => console.log('Error connecting local database'));
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

//*handle unhandled Promise rejection ..example:when you write wrong data in config.env

process.on('unhandledRejection', (err) => {
  console.log(`Error : ${err.message}`);
  console.log('closing connection due to unhandled Promise rejection');
  server.close(() => process.exit(1));
});
