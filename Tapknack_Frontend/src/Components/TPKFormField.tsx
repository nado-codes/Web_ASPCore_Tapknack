import React from "react";
import {
  Grid,
  TextField,
  InputLabel,
  StandardTextFieldProps,
} from "@material-ui/core";

import { useGlobalStyles } from "../Styles/GlobalStyles";

// TODO: Make some of these into inline styles
const styles = {
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
};

const TPKFormField: React.FC<Props> = ({
  label,
  icon,
  disabled,
  labelMinWidth,
  textFieldMinWidth,
  onChange = () => null,
  ...props
}) => {
  const globalStyles = useGlobalStyles();
  const { style } = props;
  const { fontSize } = style ?? { fontSize: undefined };

  return (
    <Grid container style={{ ...styles.formField }}>
      <Grid
        item
        style={{ ...styles.formFieldLabelContainer, minWidth: labelMinWidth }}
      >
        {icon && icon}
        {label && (
          <InputLabel className={globalStyles.white16} style={{ fontSize }}>
            {label}
          </InputLabel>
        )}
      </Grid>
      <Grid
        item
        style={{
          ...styles.formFieldTextFieldContainer,
          minWidth: textFieldMinWidth,
          border: disabled
            ? "1px solid #AAAAAA"
            : styles.formFieldTextFieldContainer.border,
        }}
      >
        <TextField
          {...props}
          disabled={disabled}
          onChange={({ target: { value } }) => onChange(value)}
          InputProps={{
            style: {
              ...styles.formFieldTextField,
              fontSize,
            },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
        />
      </Grid>
    </Grid>
  );
};

interface Props extends Omit<StandardTextFieldProps, "onChange"> {
  label?: string;
  icon?: any;
  labelMinWidth: number;
  textFieldMinWidth?: number;
  onChange?: (val: string) => void;
}

export default TPKFormField;
