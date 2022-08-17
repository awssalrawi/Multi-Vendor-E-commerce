import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Settings } from '@material-ui/icons';

import PropTypes from 'prop-types';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
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
const CustomDialog = ({ body }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Settings />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="edit-address"
        open={open}
      >
        <BootstrapDialogTitle id="edit-address" onClose={handleClose}>
          تعديل العنوان
        </BootstrapDialogTitle>

        <DialogContent dividers>{body}</DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default CustomDialog;
