const Category = require('./../models/categoryModel');
const catchAsync = require('../utilities/catchAsync');

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
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      parentId: cate.parentId,
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

  res.status(200).json({
    success: true,
    data: category,
  });
});
