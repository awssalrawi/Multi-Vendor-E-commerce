const Category = require('./../models/categoryModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');
//* nested categories
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (!parentId) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    let categoryImage = [];
    if (cate.categoryImage) categoryImage = cate.categoryImage;
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      parentId: cate.parentId,
      categoryImage,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
//* create a category  /api/v1/categories/create
exports.createCategory = catchAsync(async (req, res, next) => {
  const categoryObj = {
    name: req.body.name,
  };

  if (req.file) {
    categoryObj.categoryImage = `${process.env.SERVER_API}/public/${req.file.filename}`;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  console.log('Iam here');
  const category = await Category.create(categoryObj);

  res.status(201).json({
    success: true,
    category,
    message: 'Category created successfully',
  });
});
//* get all categories /api/v1/categories/create
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  const categoryList = createCategories(categories);

  res.status(200).json({
    success: true,
    data: { categoryList },
  });
});

//* get category by id /api/v1/categories/:categoryId
exports.getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category)
    return next(new AppError('There is no Category with that Id', 404));

  res.status(200).json({
    success: true,
    category,
  });
});
//* delete category by admin  /api/v1/categories/:categoryId
exports.deleteCategoryById = catchAsync(async (req, res, next) => {
  const doc = await Category.findByIdAndDelete(req.params.categoryId);
  if (!doc) {
    return next(new AppError('No document found with that id', 404));
  }

  res.status(204).json({
    success: true,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const id = req.params.categoryId;
  const update = {};
  if (req.body.name) {
    update.name = req.body.name;
    update.slug = req.body.name.toLowerCase();
  }
  if (req.body.parentId) {
    update.parentId = req.body.parentId;
  } else {
  }

  if (req.file) {
    update.categoryImage = `${process.env.SERVER_API}/public/${req.file.filename}`;
  }

  console.log('update', update);
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      $set: update,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category)
    return next(new AppError('No Category found with that id', 404));

  res.status(200).json({
    success: true,
    category,
  });
});
