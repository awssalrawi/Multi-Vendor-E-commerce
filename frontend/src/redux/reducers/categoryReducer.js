import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_CREATE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from '../constants/categoryConstant';

const buildNewCategories = (parentId, categories, category) => {
  if (parentId === undefined) {
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

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
    case ADMIN_CREATE_CATEGORY_REQUEST:
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
          action.payload.category.parentId,
          state.categories,
          action.payload.category
        ),

        loading: false,
      };
    case ADMIN_CREATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
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
