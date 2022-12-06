import React from "react";

import {
  Slide,
  Dialog,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";


import {X as CloseIcon} from "../../../icons/x";

import PropTypes from "prop-types";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        fontSize: 22,
        color: (theme) => props?.color | theme.palette.grey[800],
        borderBottom: 1,
        borderColor: (theme) => theme.palette.grey[300],
        // background: (theme) => theme.palette.grey[100],// '#F3F4F6',
      }}

      {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 10,
            fontSize: 50,
            color: (theme) => theme.palette.grey[500],
            '&:hover': {
              color: '#dc3545',
            }
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