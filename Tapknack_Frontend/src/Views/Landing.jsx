import React from "react";
import { Grid, Typography, makeStyles, Link } from "@material-ui/core";
import SignupForm from "../Components/Landing/SignupForm";
import Footer from "../Components/FooterA";

import TPKIcon from "../res/Icons/iconTPK";

import { useGlobalStyles } from "../Styles/GlobalStyles";
import PropTypes from "prop-types";

// TODO: Make these into inline styles
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 0,
    top: 0,
  },
  link: {
    color: "#29E4FF",
    cursor: "pointer",
    "&:active": {
      color: "white",
    },
  },
}));

/*
  Landing Page. Includes site description + signup form to allow Users to create an account. Users may also access the signin page from here

  Created by Nathan Linsley 08/08/2021
*/
const Landing = ({ theme, gotoUrl, testingEnabled }) => {
  // .. Styles
  const classes = useStyles(theme);
  const globalClasses = useGlobalStyles(theme);

  // .. Link behaviour
  const handleSigninClicked = () => gotoUrl("/signin");
  const handleUseLiabilityClicked = () => gotoUrl("/liability");
  const handlePrivacyClicked = () => gotoUrl("/privacy");

  console.log(testingEnabled);

  testingEnabled === true && console.log("testing is enabled");

  return (
    <Grid container className={classes.root}>
      {/* Top Panel - Site Info + Signup Form */}
      <Grid container style={{ display: "flex", flex: 0.8 }}>
        {/* Top Panel Left - Content - Logo, Title & Description  */}
        <Grid
          container
          style={{
            display: "flex",
            flex: 0.5,
            marginTop: "125px",
            borderRight: "2px solid rgba(40,172,217,.5)",
            justifyContent: "center",
          }}
        >
          {/* Top Panel Left - Content - Logo, Title & Description  */}
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "-175px",
            }}
          >
            {/* Logo - TapKnack */}
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TPKIcon />
            </Grid>

            {/* Centering Container - Title, Slogan, Description */}
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* Title - Welcome, Slogan "Created for Students..." */}
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "50%",
                  borderBottom: "2px solid rgba(40,172,217,.5)",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                {/* Title */}
                <Typography className={globalClasses.whiteTitle}>
                  Welcome to TapKnack!
                </Typography>
                {/* Slogan */}
                <Typography
                  style={{
                    textAlign: "center",
                    color: "#29E4FF",
                    fontFamily: "Ubuntu",
                  }}
                >
                  Created for students - by students
                </Typography>
              </Grid>

              {/* Body - Description */}
              <Grid
                item
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  marginTop: "20px",
                }}
              >
                {/* Description - "Tapknack is..." */}
                <Typography
                  className={globalClasses.white14}
                  style={{
                    textAlign: "center",
                  }}
                >
                  'TapKnack is the revolutionary new platform, connecting
                  students with valuable work experience in their chosen field
                  and connecting businesses/startups with the talent they so
                  desperately need'
                </Typography>
                {/* Description Footer - "...It's Free!"" */}
                <Typography
                  style={{
                    fontFamily: "Ubuntu",
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: "15px",
                  }}
                >
                  And best of all - it's <b>FREE!</b>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Top Panel Right - Title, Form & Links */}
        <Grid
          container
          style={{
            flex: 0.5,
            display: "flex",
            alignItems: "center",
            marginTop: "-0px",
          }}
        >
          {/* Centering Container - Title, Form & Links */}
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Sign Up Now! */}
            <Grid item style={{ flex: 0.1 }}>
              <Typography className={globalClasses.whiteTitle}>
                Sign Up Now!
              </Typography>
            </Grid>

            {/* Form */}
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                flex: 0.9,
              }}
            >
              <SignupForm />
            </Grid>

            {/* Sign-in, Use & Liability + Privacy Policy */}
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "40px",
              }}
            >
              {/* Sign In */}
              <Grid item>
                <Typography className={globalClasses.white14}>
                  Already a member?{" "}
                  <Link className={classes.link} onClick={handleSigninClicked}>
                    Sign In!
                  </Link>
                </Typography>
              </Grid>
              {/* Use & Liability */}
              <Grid item style={{ marginTop: 10 }}>
                <Typography className={globalClasses.white14}>
                  Please read our{" "}
                  <Link
                    className={classes.link}
                    onClick={handleUseLiabilityClicked}
                  >
                    {"Use & Liability"}
                  </Link>{" "}
                  clause before use
                </Typography>
              </Grid>
              {/* Disclaimer */}
              <Grid item>
                <Typography
                  className={globalClasses.white14}
                  style={{ fontSize: 11 }}
                >
                  By using Tapknack, you automatically agree to these terms!
                </Typography>
              </Grid>
              {/* Privacy Policy */}
              <Grid item style={{ marginTop: 10 }}>
                <Typography className={globalClasses.white14}>
                  View our{" "}
                  <Link className={classes.link} onClick={handlePrivacyClicked}>
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Footer */}
      <Footer showSubtitle />
    </Grid>
  );
};

Landing.propTypes = {
  gotoUrl: PropTypes.func.isRequired,
  theme: PropTypes.shape({}),
};

Landing.defaultProps = {
  theme: {},
};

export default Landing;
