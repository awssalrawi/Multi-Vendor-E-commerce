import React from "react";
import Button from "@mui/material/Button";

const ButtonMat = ({ name, icon, variant, ...props }) => {
  return (
    <Button
      variant={variant ? variant : "contained"}
      startIcon={icon}
      {...props}
    >
      {name}
    </Button>
  );
};

export default ButtonMat;
