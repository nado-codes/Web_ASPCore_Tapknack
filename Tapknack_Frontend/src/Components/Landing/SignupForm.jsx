import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGlobalStyles } from "../../Styles/GlobalStyles";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import FormField from "../FormField";

const SignupFormTest = ({
  username,
  setUsername,
  email,
  setEmail,
  pass,
  setPass,
  passConfirm,
  setPassConfirm,
  handleSubmit,
  handlePass,
  handleFail,
}) => {
  const testUuid = uuidv4();
  const testUsername = `testUser-${testUuid}`;
  const testEmail = `testUserEmail-${testUuid}`;
  const testPassword = `testUserPass-${testUuid}`;
  const testPasswordConfirm = `testUserPassConfirm${testUuid}`;

  setUsername(testUsername);
  setEmail(testEmail);
  setPass(testPassword);
  setPassConfirm(testPasswordConfirm);

  useEffect(() => {
    run();
  }, [username, pass, email]);

  const run = async () => {
    try {
      console.log("running SignupFormTest...");
      const result = await handleSubmit({
        username: testUsername,
        pass: testPassword,
        email: testEmail,
      });
      evaluate(result);
      cleanup();
    } catch (error) {
      return handleFail?.(error);
    }
  };

  const assertEqual = (expected, actual) => {
    if (actual !== expected)
      throw {
        name: `Assert Equal FAIL`,
        message: `Expected ${expected}, got ${actual}`,
      };

    return true;
  };

  const evaluate = (result) => {
    const { username, email } = result;
    try {
      assertEqual(testUsername, username);
      assertEqual(testEmail, email);
      handlePass();
    } catch (error) {
      console.log(error);
      handleFail(error);
    }
  };

  const cleanup = () => {
    setUsername("");
    setEmail("");
    setPass("");
    setPassConfirm("");
  };

  return null;
};

const SignupForm = ({ theme }) => {
  const globalStyles = useGlobalStyles(theme);
  const labelMinWidth = 185;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const [runTest, setRunTest] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("New Notification");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarDetailText, setSnackbarDetailText] = useState("");

  useEffect(() => {
    setRunTest(false);
  }, []);

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
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }

    // .. TODO: Goto "Dashboard"
  };

  const handleTestPass = () => {
    setSnackbarSeverity("success");
    setSnackbarText("Test success");
    setSnackbarIsOpen(true);
  };

  const handleTestFail = (error) => {
    const { name, message } = error;
    setSnackbarSeverity("error");
    setSnackbarText(`Test failed: ${name}. Click for more details`);
    setSnackbarDetailText(`${name}: ${message}`);
    setSnackbarIsOpen(true);
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
      {runTest && (
        <SignupFormTest
          setUsername={setUsername}
          setEmail={setEmail}
          setPass={setPass}
          setPassConfirm={setPassConfirm}
          handleSubmit={handleSubmit}
          handlePass={handleTestPass}
          handleFail={handleTestFail}
        />
      )}
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
