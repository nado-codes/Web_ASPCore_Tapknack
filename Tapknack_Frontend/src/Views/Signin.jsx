import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import FormField from "../Components/FormField";
import Footer from "../Components/FooterA";
import { useGlobalStyles } from "../Styles/GlobalStyles";

import TPKIcon from "../res/Icons/iconTPK";
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

const Signin = ({ theme, gotoUrl }) => {
  const globalStyles = useGlobalStyles(theme);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
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
          <TPKIcon size={200} />
        </Grid>
        {/* Form */}
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            width: "100%",
          }}
        >
          {isLoading && (
            <CircularProgress
              size={40}
              style={{ position: "absolute", marginTop: "20px" }}
            />
          )}
          <Grid item style={{ marginLeft: "0px" }}>
            {" "}
            {/* -25px */}
            <FormField
              label="abc"
              disabled={isLoading}
              value={username}
              labelMinWidth={30}
              textFieldMinWidth={0} // 250
              onChange={setUsername}
            />
            <FormField
              icon={<PadlockIcon />}
              type="password"
              disabled={isLoading}
              value={pass}
              labelMinWidth={30}
              textFieldMinWidth={0} // 250
              onChange={setPass}
            />
          </Grid>
          <Button
            className={globalStyles.genericButton}
            disabled={isLoading}
            onClick={handleSubmitClicked}
            style={{
              marginTop: "50px",
              width: "150px",
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
          {/* Footer */}
          <Grid item style={{ width: "100%", marginTop: "30px" }}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Signin.propTypes = {
  gotoUrl: PropTypes.func.isRequired,
};

export default Signin;
