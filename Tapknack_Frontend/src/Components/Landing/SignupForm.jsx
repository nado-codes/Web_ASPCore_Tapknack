import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "10px",
  },
  formFieldLabelContainer: {
    display: "flex",
    alignItems: "center",
    width: "185px",
  },
  formFieldLabel: {
    font: "Ubuntu",
    color: "white",
    fontSize: 14,
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
  formButton: {
    color: "#29E4FF",
    textTransform: "none",
    fontFamily: "Ubuntu",
    "&:hover": {
      background: "rgba(40,172,217,0.75)",
      color: "white", //40 172 217
    },
    "&:active": {
      background: "#29E4FF",
      color: "white",
    },
  },
}));

const SignupForm = ({ theme }) => {
  const classes = useStyles(theme);

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10px",
      }}
    >
      {/* Top - Form Fields */}
      <Grid
        container
        style={{
          display: "flex",
          width: "75%",
        }}
      >
        {/* Username */}
        <Grid container className={classes.formField}>
          <Grid item className={classes.formFieldLabelContainer}>
            <Typography className={classes.formFieldLabel}>
              Create Your Username
            </Typography>
          </Grid>
          <Grid item className={classes.formFieldTextFieldContainer}>
            <TextField
              InputProps={{
                className: classes.formFieldTextField,
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          </Grid>
        </Grid>

        {/* Pass */}
        <Grid container className={classes.formField}>
          <Grid item className={classes.formFieldLabelContainer}>
            <Typography className={classes.formFieldLabel}>
              Create Your Password
            </Typography>
          </Grid>
          <Grid item className={classes.formFieldTextFieldContainer}>
            <TextField
              type="password"
              InputProps={{
                className: classes.formFieldTextField,
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          </Grid>
        </Grid>

        {/* Pass Confirm */}
        <Grid container className={classes.formField}>
          <Grid item className={classes.formFieldLabelContainer}>
            <Typography className={classes.formFieldLabel}>
              Confirm Your Password
            </Typography>
          </Grid>
          <Grid item className={classes.formFieldTextFieldContainer}>
            <TextField
              type="password"
              InputProps={{
                className: classes.formFieldTextField,
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          </Grid>
        </Grid>

        {/* Email */}
        <Grid container className={classes.formField}>
          <Grid item className={classes.formFieldLabelContainer}>
            <Typography className={classes.formFieldLabel}>
              Enter Your Email
            </Typography>
          </Grid>
          <Grid item className={classes.formFieldTextFieldContainer}>
            <TextField
              InputProps={{
                className: classes.formFieldTextField,
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Bottom - Submit + Use & Liability */}
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
        }}
      >
        {/* Upper Bottom - Submit */}
        <Grid item>
          <Button
            className={classes.formButton}
            variant="outline"
            title
            style={{
              border: "2px solid #29E4FF",
              fontSize: 20,
              width: "200px",
              height: "50px",
            }}
          >
            Submit
            {/*<Typography
              className={classes.formFieldLabel}
              style={{
                fontSize: 20,
                color: "#29E4FF",
                textTransform: "none",
              }}
            >*/}
            {/* </Typography> */}
          </Button>
        </Grid>
        <Grid item>Use + Liability</Grid>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
