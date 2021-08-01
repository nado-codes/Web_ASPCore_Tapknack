import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { useGlobalStyles } from "../../Styles/GlobalStyles";

import FormField from "../FormField";

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

const SignupForm = ({ theme }) => {
  const classes = useStyles(theme);
  const globalStyles = useGlobalStyles(theme);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitClicked = () => {
    console.log("you clicked submit!");
    setIsLoading(true);
    setTimeout(handleSubmit, 1500);
  };

  const handleSubmit = () => {
    setIsLoading(false);
  };

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
      <Grid
        item
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <CircularProgress size={40} style={{ position: "absolute" }} />
        )}
        {/* Top - Form Fields */}
        <Grid
          container
          style={{
            display: "flex",
            width: "75%",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          {/* Username */}
          {/* <Grid container className={classes.formField}>
            <Grid item className={classes.formFieldLabelContainer}>
              <Typography className={globalStyles.white14}>
                Create Your Username
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.formFieldTextFieldContainer}
              style={isLoading ? { border: "1px solid #AAAAAA" } : {}}
            >
              <TextField
                disabled={isLoading}
                value={username}
                onChange={({ target: { value } }) => setUsername(value)}
                InputProps={{
                  className: classes.formFieldTextField,
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />
            </Grid>
              </Grid> */}
          <FormField label="Create Your Username" onChange={setUsername} />

          {/* Pass */}
          <Grid container className={classes.formField}>
            <Grid item className={classes.formFieldLabelContainer}>
              <Typography className={globalStyles.white14}>
                Create Your Password
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.formFieldTextFieldContainer}
              style={isLoading ? { border: "1px solid #AAAAAA" } : {}}
            >
              <TextField
                disabled={isLoading}
                value={pass}
                onChange={({ target: { value } }) => setPass(value)}
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
              <Typography className={globalStyles.white14}>
                Confirm Your Password
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.formFieldTextFieldContainer}
              style={isLoading ? { border: "1px solid #AAAAAA" } : {}}
            >
              <TextField
                disabled={isLoading}
                value={passConfirm}
                onChange={({ target: { value } }) => setPassConfirm(value)}
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
              <Typography className={globalStyles.white14}>
                Enter Your Email
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.formFieldTextFieldContainer}
              style={isLoading ? { border: "1px solid #AAAAAA" } : {}}
            >
              <TextField
                disabled={isLoading}
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
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
      </Grid>
      {/* Bottom - Submit */}
      <Grid item>
        <Button
          className={globalStyles.genericButton}
          disabled={isLoading}
          onClick={handleSubmitClicked}
          variant="outline"
          title
          style={{
            marginTop: 20,
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
