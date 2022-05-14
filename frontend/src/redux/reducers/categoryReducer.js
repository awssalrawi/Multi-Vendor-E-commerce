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
  let myCategories = [];
  for (let cat of categories) {
    if (cat._id === parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
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
        children:
          cat.children && cat.children.length > 0
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
          action.payload.parentId,
          state.categories,
          action.payload
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
