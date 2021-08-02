import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Typography,
  InputLabel,
} from "@material-ui/core";

import { useGlobalStyles } from "../Styles/GlobalStyles";

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
    width: "185px",
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

const FormField = ({ label, type, disabled, value, onChange, theme }) => {
  const classes = useStyles(theme);
  const globalStyles = useGlobalStyles(theme);

  return (
    <Grid container className={classes.formField}>
      <Grid item className={classes.formFieldLabelContainer}>
        <InputLabel className={globalStyles.white14}>{label}</InputLabel>
      </Grid>
      <Grid
        item
        className={classes.formFieldTextFieldContainer}
        style={disabled ? { border: "1px solid #AAAAAA" } : {}}
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

export default FormField;
