import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_CREATE_CATEGORY_FAIL,
  ADMIN_GET_CATEGORY_BY_ID_REQUEST,
  ADMIN_GET_CATEGORY_BY_ID_SUCCESS,
  ADMIN_GET_CATEGORY_BY_ID_FAIL,
  ADMIN_DELETE_CATEGORY_BY_ID_REQUEST,
  ADMIN_DELETE_CATEGORY_BY_ID_SUCCESS,
  ADMIN_DELETE_CATEGORY_BY_ID_FAIL,
  ADMIN_UPDATE_CATEGORY_REQUEST,
  ADMIN_UPDATE_CATEGORY_SUCCESS,
  ADMIN_UPDATE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryConstant";

// const buildNewCategories = (parentId, categories, category) => {
//   let myCategories = [];

//   if (!parentId || parentId === '') {
//     return [
//       ...categories,
//       {
//         _id: category._id,
//         name: category.name,
//         slug: category.slug,
//         showType: category.showType,
//         children: [],
//       },
//     ];
//   }

//   for (let cat of categories) {
//     if (cat._id === parentId) {
//       const newCategory = {
//         _id: cat._id,
//         name: cat.name,
//         slug: cat.slug,
//         showType: cat.showType,
//         parentId: cat.parentId,
//         children: [],
//         // ? buildNewCategories(
//         //     parentId,
//         //     [
//         //       ...cat.children,
//         //       {
//         //         _id: category._id,
//         //         name: category.name,
//         //         slug: category.slug,
//         //         parentId: category.parentId,
//         //         children: category.children,
//         //         showType: category.showType,
//         //       },
//         //     ],
//         //     category
//         //   )
//         // : [],
//       };

//       myCategories.push({
//         ...cat,
//         children: cat.children ? [...cat.children, newCategory] : [newCategory],
//       });
//     } else {
//       myCategories.push({
//         ...cat,
//         children: cat.children
//           ? buildNewCategories(parentId, cat.children, category)
//           : [],
//       });
//     }
//   }
//   return myCategories;
// };

const buildNewCategories = (parentId, categories, category) => {
  console.log("parentId", parentId);
  console.log("categories", categories);
  console.log("category", category);
  if (!parentId) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }

  let myCategories = [];
  for (let cat of categories) {
    if (cat._id === parentId) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parentId: category.parentId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCategories;
};
const buildCategoriesAfterDelete = (deletedCatId, categories) => {
  // let updatedCategories = categories.filter(
  //   (category) => category._id !== deletedCatId
  // );
  let updatedCategories = [];

  const isMain = categories.find((category) => category._id === deletedCatId);

  if (isMain) {
    updatedCategories = categories.filter(
      (category) => category._id !== deletedCatId
    );
    return updatedCategories;
  }
  updatedCategories = categories.map((category) => {
    return {
      ...category,
      children:
        category.children.length > 0
          ? buildCategoriesAfterDelete(deletedCatId, category.children)
          : // ? category.children.filter((subCat) => subCat._id !== deletedCatId)
            [],
    };
  });
  return updatedCategories;

  // console.log(updatedCategories);
};

const buildNewCategoriesAfterUpdate = (updatedCat, categories) => {
  const deleteCat = buildCategoriesAfterDelete(updatedCat._id, categories);

  const result = buildNewCategories(updatedCat.parentId, deleteCat, updatedCat);
  console.log(result);
  return result;
};

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
    case ADMIN_CREATE_CATEGORY_REQUEST:
    case ADMIN_DELETE_CATEGORY_BY_ID_REQUEST:
    case ADMIN_UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        category: null,
        error: action.payload,
      };
    case ADMIN_CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: buildNewCategories(
          action.payload.parentId ? action.payload.parentId : null,
          state.categories,
          action.payload
        ),

        loading: false,
      };
    case ADMIN_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: buildNewCategoriesAfterUpdate(
          action.payload,
          state.categories
        ),
        loading: false,
      };

    case ADMIN_DELETE_CATEGORY_BY_ID_SUCCESS:
      return {
        loading: false,
        categories: buildCategoriesAfterDelete(
          action.payload,
          state.categories
        ),
      };
    case ADMIN_CREATE_CATEGORY_FAIL:
    case ADMIN_GET_CATEGORY_BY_ID_FAIL:
    case ADMIN_DELETE_CATEGORY_BY_ID_FAIL:
    case ADMIN_UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const categoryConfigReducer = (
  state = { category: {}, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case ADMIN_GET_CATEGORY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case ADMIN_GET_CATEGORY_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
