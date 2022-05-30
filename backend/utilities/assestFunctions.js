const AppError = require('./../utilities/appError');
const path = require('path');
const { rm } = require('fs/promises');

const fs = require('fs');

exports.deleteImagesFromStorage = (arrayOfImages) => {
  for (let file of arrayOfImages) {
    const ImageName = file.img.split('/public/')[1];
    const existPath = path.join(__dirname, `../uploads/${ImageName}`);
    fs.access(existPath, fs.F_OK, (err) => {
      if (err) {
        return;
      }
      //file exists
      checkCardImageInStorage = true;
      rm(existPath).catch((err) =>
        next(new AppError('Some Thing went wrong ,Please try again later'))
      );
    });
  }
};

exports.deleteSingleImageFromStorage = (imageUrl) => {
  const ImageName = imageUrl.split('/public/')[1];
  const existPath = path.join(__dirname, `../uploads/${ImageName}`);
  fs.access(existPath, fs.F_OK, (err) => {
    if (err) {
      return;
    }
    rm(existPath).catch((err) =>
      next(new AppError('Some Thing went wrong ,Please try again later'))
    );
  });
};

exports.takeUrlFormImageFiles = (arrayOfFiles) => {
  return arrayOfFiles.map((file) => ({
    img: `${process.env.SERVER_API}/public/${file.filename}`,
  }));
};
