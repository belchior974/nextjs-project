import React from "react";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";

const Textfield = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    const data = event.target.value;
    return setFieldValue(name, data);
  };

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
  };

  if (meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField size="small" autoComplete="off" {...configTextField} />;
};

Textfield.propTypes = {
  error: PropTypes.bool,
  setError: PropTypes.func,
};

export default Textfield;
