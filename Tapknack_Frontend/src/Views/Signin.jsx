import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import FormField from "../Components/FormField";
import { useGlobalStyles } from "../Styles/GlobalStyles";

import tpkIcon from "../res/tpk.png";
import padlockIcon from "../res/ic/icPadlock_48.png";
import PropTypes from "prop-types";

// TODO: will use later
// import ndcIcon from "../res/nadocoLogo.png";

const PadlockIcon = () => (
  <img
    src={padlockIcon}
    alt="Padlock"
    style={{
      marginRight: "-10px",
      width: "36px",
      height: "36px",
      objectFit: "contain",
    }}
  />
);

const TPKIcon = () => (
  <img
    src={tpkIcon}
    alt="TapKnack"
    style={{ width: "250px", height: "250px", objectFit: "contain" }}
  />
);

const Signin = ({ theme, gotoUrl }) => {
  const globalStyles = useGlobalStyles(theme);

  const [username, setUsername] = useState(undefined);
  const [pass, setPass] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupClicked = () => {
    gotoUrl("");
  };

  const handlePrivacyClicked = () => {
    gotoUrl("/privacy");
  };

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
        position: "absolute",
        width: "100%",
        bottom: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "35%",
          position: "absolute",
          paddingTop: "50px",
          top: 0,
          bottom: 0,
        }}
      >
        {/* Logo */}
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "25px",
            borderBottom: "2px solid rgba(40,172,217,.5)",
          }}
        >
          <TPKIcon />
        </Grid>
        {/* Form */}
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          {isLoading && (
            <CircularProgress
              size={40}
              style={{ position: "absolute", marginTop: "20px" }}
            />
          )}
          <FormField
            label="abc"
            disabled={isLoading}
            value={username}
            labelMinWidth={"35px"}
            onChange={setUsername}
          />
          <FormField
            icon={<PadlockIcon />}
            type="password"
            disabled={isLoading}
            value={pass}
            labelMinWidth={"35px"}
            onChange={setPass}
          />
          <Button
            className={globalStyles.genericButton}
            disabled={isLoading}
            onClick={handleSubmitClicked}
            style={{
              marginTop: "50px",
            }}
          >
            Login
          </Button>
        </Grid>

        {/* Links */}
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          {/* Sign In */}
          <Grid item>
            <Typography className={globalStyles.white14}>
              No account?{" "}
              <Link className={globalStyles.link} onClick={handleSignupClicked}>
                Sign Up!
              </Link>
            </Typography>
          </Grid>
          {/* Privacy Policy */}
          <Grid item style={{ marginTop: 10 }}>
            <Typography className={globalStyles.white14}>
              View our{" "}
              <Link
                className={globalStyles.link}
                onClick={handlePrivacyClicked}
              >
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
        </Grid>
        {/* Footer */}
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
};

Signin.propTypes = {
  gotoUrl: PropTypes.func.isRequired,
};

export default Signin;
