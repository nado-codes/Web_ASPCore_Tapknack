import React from "react";
import { Grid, Typography, Button, makeStyles, Link } from "@material-ui/core";
import SignupForm from "../Components/Landing/SignupForm";

import tpkIcon from "../res/tpk.png";
import ndcIcon from "../res/nadocoLogo.png";

import { useGlobalStyles } from "../Styles/GlobalStyles";
import PropTypes from "prop-types";

const TPKIcon = () => (
  <img
    src={tpkIcon}
    alt="TapKnack"
    style={{ width: "250px", height: "250px", objectFit: "contain" }}
  />
);

const NDCIcon = () => {
  const classes = useStyles();

  return (
    <img
      className={classes.img}
      src={ndcIcon}
      alt="NadoCo Interactive"
      style={{ width: "150px", height: "50px", objectFit: "contain" }}
    />
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 0,
    top: 0,
  },
  img: {
    webkitUserSelect: "none",
    khtmlUserSelect: "none",
    mozUserSelect: "none",
    oUserSelect: "none",
    userSelect: "none",
  },
  link: {
    color: "#29E4FF",
    cursor: "pointer",

    "&:active": {
      color: "white",
    },
  },
}));

const Landing = ({ theme, gotoUrl }) => {
  const classes = useStyles(theme);
  const globalClasses = useGlobalStyles(theme);

  const handleSigninClicked = () => {
    // .. load signin page here
    gotoUrl("/signin");
  };

  const handleUseLiabilityClicked = () => {
    console.log("you clicked use & liability!");
  };

  const handlePrivacyClicked = () => {
    console.log("you clicked privacy policy!");
  };

  return (
    <Grid container className={classes.root}>
      {/* Top Panel */}
      <Grid container style={{ display: "flex", flex: 0.8 }}>
        {/* Top Panel Left */}
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
          {/* Top Panel Left - Content */}
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "-175px",
            }}
          >
            {/* Logo */}
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TPKIcon />
            </Grid>

            {/* Center Container */}
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* Title */}
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

              {/* Body */}
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

        {/* Top Panel Right */}
        <Grid
          container
          style={{
            flex: 0.5,
            display: "flex",
            alignItems: "center",
            marginTop: "-0px",
          }}
        >
          {/* Center Container */}
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
      {/* Bottom Panel */}
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 0.2,
          alignItems: "center",
        }}
      >
        <Grid
          container
          style={{
            width: "25%",
            flex: 0.1,
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Typography style={{ color: "#29E4FF", fontFamily: "Ubuntu" }}>
            Brought to you by
          </Typography>
        </Grid>
        <Grid
          container
          style={{
            width: "25%",
            flex: 0.9,
            paddingTop: "-20px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Grid item>
            <Button
              startIcon={<NDCIcon />}
              style={{
                borderRadius: "10px",
                userSelect: "none",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Landing.propTypes = {
  gotoUrl: PropTypes.func.isRequired,
};

export default Landing;
