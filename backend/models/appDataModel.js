const mongoose = require('mongoose');

const appDataSchema = new mongoose.Schema({
  appLogo: String,

  adsPic: [
    {
      img: String,
    },
  ],
});
module.exports = mongoose.model('AppData', appDataSchema);
