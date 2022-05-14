const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },

    picture: String,

    role: {
      type: String,
      default: 'subscriber',
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// userSchema
//   .virtual('password')
//   .set(function (password) {
//     // create a temporarity variable called _password
//     this._password = password;
//     // generate salt
//     this.salt = this.makeSalt();
//     // encryptPassword
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// userSchema.methods = {
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   encryptPassword: function (password) {
//     if (!password) return '';
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex');
//     } catch (err) {
//       return '';
//     }
//   },

//   makeSalt: function () {
//     return Math.round(new Date().valueOf() * Math.random()) + '';
//   },
// };

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.password === 'GoogleAccount')
    return next();

  //*bcrypt online
  this.password = await bcrypt.hash(this.password, 12);

  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    //! see lecture 131.
    const changeTimesTamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changeTimesTamp, JWTTimestamp);
    return JWTTimestamp < changeTimesTamp;
  }
  //*false mean not changed
  return false;
};

userSchema.methods.CreatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 12 * 60 * 1000;
  return resetToken;
};
//! try to send name email and picture url in this token , after that go to react and save this token in localStorage
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = mongoose.model('User', userSchema);
