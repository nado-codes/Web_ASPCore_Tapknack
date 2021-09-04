import React, { useState } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { useGlobalStyles } from "../../Styles/GlobalStyles";
import axios from "axios";

import FormField from "../FormField";

const SignupForm = ({ theme }) => {
  const globalStyles = useGlobalStyles(theme);
  const labelMinWidth = 185;

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    // .. TODO: Goto "Dashboard"
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
