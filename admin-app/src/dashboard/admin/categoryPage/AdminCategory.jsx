import React, { Fragment, useState } from "react";
import "./admin-category.scss";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useSelector } from "react-redux";
import LoaderSpinner from "../../../utilities/LoaderSpinner/LoaderSpinner";
import { Link, useNavigate } from "react-router-dom";
import CheckboxTree from "react-checkbox-tree";

import {
  ArrowRight,
  ArrowDropDown,
  StarRate,
  FolderOutlined,
  PermMediaOutlined,
} from "@material-ui/icons";

const AdminCategory = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const navigate = useNavigate();
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        showCheckbox: false,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  //       <li key={category.name} className="fun-category-list__item">
  //         {category.name}
  //         {category.children.length > 0 ? (
  //           <ul className="fun-category-list">
  //             {renderCategories(category.children)}
  //           </ul>
  //         ) : null}
  //       </li>
  //     );
  //   }
  //   return myCategories;
  // };
  //!for display categories

  //!for display categories

  // const renderCategories = (categories) => {
  //   let myCategories = [];
  //   for (let category of categories) {
  //     myCategories.push(
  //       <li key={category.name}>
  //         {category.parentId ? (
  //           <a href={`categories/${category._id}`}>{category.name}</a>
  //         ) : (
  //           <span>{category.name}</span>
  //         )}

  //         {category.children.length > 0 ? (
  //           <ul>{renderCategories(category.children)}</ul>
  //         ) : null}
  //       </li>
  //     );
  //   }
  //   return myCategories;
  // };

  const { categories, loading } = useSelector((state) => state.category);

  return (
    <Fragment>
      <div className="admin-cat">
        <div className="name-add-btn">
          <span className="cat-title">Categories</span>
          <Link to="/admin/create-category" className="add-cat-btn">
            Create New Category
          </Link>
        </div>
        <div className="categories_container-admin">
          {/* <ul className="fun-category-list">
            {categories && renderCategories(categories)}
          </ul> */}
          {loading ? (
            <LoaderSpinner text="Loading Categories" />
          ) : (
            <Fragment>
              <CheckboxTree
                nodes={renderCategories(categories)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                onClick={(e) => navigate(`/admin/categories/${e.value}`)}
                icons={{
                  check: <ArrowRight fontSize="small" />,
                  uncheck: <ArrowRight fontSize="small" />,
                  halfCheck: <ArrowRight fontSize="small" />,
                  expandClose: <ArrowRight fontSize="small" />,
                  expandOpen: <ArrowDropDown fontSize="small" />,
                  expandAll: <StarRate fontSize="small" />,
                  collapseAll: <StarRate fontSize="small" />,
                  parentClose: <PermMediaOutlined fontSize="small" />,
                  parentOpen: (
                    <ArrowDropDown
                      fontSize="small"
                      style={{ display: "none" }}
                    />
                  ),
                  leaf: (
                    <StarRate fontSize="small" style={{ marginTop: "5px" }} />
                  ),
                }}
              />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCategory;
