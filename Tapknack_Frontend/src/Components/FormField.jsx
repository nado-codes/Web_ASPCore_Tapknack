import React from "react";
import { makeStyles, Grid, TextField, InputLabel } from "@material-ui/core";
import PropTypes from "prop-types";

import { useGlobalStyles } from "../Styles/GlobalStyles";

// TODO: Make some of these into inline styles
const useStyles = makeStyles((theme) => ({
  formField: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
  formFieldLabelContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "auto",
    marginRight: "10px",
  },
  formFieldLabel: {
    font: "Ubuntu",
    color: "white",
    fontSize: 16,
  },
  formFieldTextFieldContainer: {
    display: "flex",
    justifyContent: "center",
    border: "1px solid #29E4FF",
    borderRadius: "8px",
    width: "175px",
    height: "35px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  formFieldTextField: {
    fontFamily: "Ubuntu",
    color: "white",
  },
}));

const FormField = ({
  label,
  icon,
  type,
  disabled,
  value,
  labelMinWidth,
  textFieldMinWidth,
  onChange,
  theme,
}) => {
  const classes = useStyles(theme);
  const globalStyles = useGlobalStyles(theme);

  return (
    <Grid container className={classes.formField}>
      <Grid
        item
        className={classes.formFieldLabelContainer}
        style={{ minWidth: labelMinWidth }}
      >
        {icon && icon}
        {label && (
          <InputLabel className={globalStyles.white16}>{label}</InputLabel>
        )}
      </Grid>
      <Grid
        item
        className={classes.formFieldTextFieldContainer}
        style={{
          border: disabled
            ? "1px solid #AAAAAA"
            : classes.formFieldTextFieldContainer.border,
          minWidth: textFieldMinWidth,
        }}
      >
        <TextField
          disabled={disabled}
          value={value}
          type={type}
          onChange={({ target: { value } }) => onChange?.(value)}
          InputProps={{
            className: classes.formFieldTextField,
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
        />
      </Grid>
    </Grid>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.shape({}),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  labelMinWidth: PropTypes.number,
  textFieldMinWidth: PropTypes.number,
  onChange: PropTypes.func,
  theme: PropTypes.shape({}),
};

FormField.defaultProps = {
  label: "",
  icon: undefined,
  type: undefined,
  disabled: false,
  labelMinWidth: undefined,
  textFieldMinWidth: undefined,
  onChange: () => {},
  theme: {},
};

export default FormField;
