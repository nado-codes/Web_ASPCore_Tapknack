import React, { useState, useEffect } from "react";
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
  const testUserPass = `testUserPass-${testUuid}`;
  const testUserPassConfirm = `testUserPassConfirm${testUuid}`;

  console.log(testUuid);

  //init
  useEffect(() => {
    setUsername(testUsername);
  }, []);
  useEffect(() => {
    setEmail(testEmail);
  }, [username]);
  useEffect(() => {
    setPass(testUserPass);
  }, [email]);
  useEffect(() => {
    setPassConfirm(testUserPassConfirm);
  }, [pass]);
  useEffect(() => {
    run();
  }, [passConfirm]);
  //end init

  const run = () => {
    try {
      console.log("running SignupFormTest...");
      const result = handleSubmit();
      evaluate(result);
    } catch (err) {
      return handleFail?.(err);
    }
  };

  const evaluate = (result) => {
    const userId = result;

    alert("TEST USER ID = ", result);
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
  const [testResults, setTestResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRunTest(false);
  }, []);

  const handleSubmitClicked = () => {
    setIsLoading(true);
    handleSubmit();
  };

  const handleSubmit = () => {
    try {
      const { data } = axios.post(`api/users`, {
        Username: username,
        Password: pass,
        Email: email,
      });

      if (data !== 1)
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

  const handleTestPass = () => {};

  const handleTestFail = (msg) => {};

  /* useEffect(() => {
    SignupFormTest(
      username,
      setUsername,
      email,
      setEmail,
      pass,
      setPass,
      passConfirm,
      setPassConfirm,
      handleSubmit,
      handleTestPass,
      handleTestFail
    );
  }, []); */

  const [snackbarIsOpen, setSnackbarIsOpen] = useState(true);

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
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
          passConfirm={passConfirm}
          setPassConfirm={setPassConfirm}
          handleSubmit={handleSubmit}
          handleTestPass={handleTestPass}
          handleTestFail={handleTestFail}
        />
      )}
      <Snackbar
        onClose={setSnackbarIsOpen}
        autoHideDuration={3000}
        open={snackbarIsOpen}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity="error">An error happened</Alert>
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
