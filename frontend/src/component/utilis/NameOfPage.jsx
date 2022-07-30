import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import './styles/name-of-page.scss';
const NameOfPage = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="nameOfPage">
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
      <span className="ltpuhead">{text}</span>
    </div>
  );
};

export default NameOfPage;
