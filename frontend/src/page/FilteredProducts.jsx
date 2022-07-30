import React, { useState, useEffect } from 'react';
import { clearErrors } from '../redux/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import GridShow from './GridShow';
import ListShow from './ListShow';
import { Apps } from '@material-ui/icons';
import { iconButton } from '@material-ui/core';
import './style/filtered-products.scss';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FilteredProducts = ({ products }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChangeAco = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.getProductsBySlug);
  const storePage = useSelector((state) => state.storePage);
  useEffect(() => {
    if (error || storePage.error) {
      dispatch(clearErrors());
    }
  }, []);

  const handleChange = (event, nextView) => {
    setShowType(nextView);
  };
  const [showType, setShowType] = useState('grid');
  return (
    <div className="side">
      {/* Here we w'll add filter */}
      <main className="side__products">
        <div className="select-show">
          <ToggleButtonGroup
            orientation="horizontal"
            value={showType}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="list" aria-label="list">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="module">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {showType === 'grid' ? (
          <GridShow products={products} />
        ) : (
          <ListShow products={products} />
        )}
      </main>
    </div>
  );
};

export default FilteredProducts;
