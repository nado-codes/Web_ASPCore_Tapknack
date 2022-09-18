import React, { useState } from "react";
import { Grid, Button, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGlobalStyles } from "../../Styles/GlobalStyles";
import axios from "axios";

import FormField from "../FormField";

const SignupForm = ({ theme }) => {
  const globalStyles = useGlobalStyles(theme);
  const labelMinWidth = 185;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("New Notification");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarDetailText, setSnackbarDetailText] = useState("");

  const handleSubmitClicked = () => {
    setIsLoading(true);
    handleSubmit({ username, pass, email });
  };

  const handleSubmit = async ({ username, pass, email }) => {
    try {
      const { data } = await axios.post(`api/users`, {
        Username: username,
        Password: pass,
        Email: email,
      });

      if (!data)
        throw Error(
          `Expected 1 row to be updated in call to AddUser, got ${data}`
        );

      return data;
    } catch (err) {
      // const errObj = JSON.parse(err.response.data);
      console.error("errObj=", err.response.data);
      throw err;
    } finally {
      setIsLoading(false);
    }

    // .. TODO: Goto "Dashboard"
  };

  const handleSnackbarDetail = () => {
    snackbarSeverity === "error" && console.error(snackbarDetailText);
    snackbarSeverity === "success" && console.log(snackbarDetailText);
    setSnackbarDetailText("");

    setSnackbarText(`Check the console for further details`);
    setSnackbarSeverity("info");
    setSnackbarIsOpen(true);
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
      <Snackbar
        onClose={setSnackbarIsOpen}
        autoHideDuration={3000}
        open={snackbarIsOpen}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClick={() => {
            snackbarDetailText && handleSnackbarDetail();
          }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
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
          <FormField
            label="Create Your Username"
            disabled={isLoading}
            value={username}
            labelMinWidth={labelMinWidth}
            onChange={setUsername}
          />
          <FormField
            label="Create Your Password"
            type="password"
            disabled={isLoading}
            value={pass}
            labelMinWidth={labelMinWidth}
            onChange={setPass}
          />

          <FormField
            label="Confirm Your Password"
            type="password"
            disabled={isLoading}
            value={passConfirm}
            labelMinWidth={labelMinWidth}
            onChange={setPassConfirm}
          />

          <FormField
            label="Enter Your Email"
            disabled={isLoading}
            value={email}
            labelMinWidth={labelMinWidth}
            onChange={setEmail}
          />
        </Grid>
      </Grid>
      {/* Bottom - Submit */}
      <Grid item>
        <Button
          className={globalStyles.genericButton}
          disabled={isLoading}
          onClick={handleSubmitClicked}
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
