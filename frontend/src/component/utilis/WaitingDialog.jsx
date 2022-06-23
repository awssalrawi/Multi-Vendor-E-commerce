import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Settings } from '@material-ui/icons';

import PropTypes from 'prop-types';
//*Spinner
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/react';
import './styles/waiting-spinner.scss';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  padding: none;
`;
//*Spinner
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const WaitingDialog = ({ loading }) => {
  const [open, setOpen] = useState(loading);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* <IconButton onClick={handleClickOpen}>
        <Settings />
      </IconButton> */}

      <BootstrapDialog
        // onClose={handleClose}
        aria-labelledby="edit-address"
        open={loading}
      >
        {/* <BootstrapDialogTitle id="edit-address" onClose={handleClose}>
          Edit your Address
        </BootstrapDialogTitle> */}

        <DialogContent dividers>
          <span className="waiting-spinner-logo">Ltreda</span>

          <div className="spinner-container">
            <FadeLoader
              color="#ff8219"
              loading={loading}
              css={override}
              size={10}
            />
          </div>
          <span className="waiting-spinner-text">Processing</span>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default WaitingDialog;
