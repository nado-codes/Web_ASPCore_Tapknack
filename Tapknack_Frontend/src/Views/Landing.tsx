import React, { useState } from "react";
import { Grid, Typography, makeStyles, Link } from "@material-ui/core";
import { SignupForm } from "../Components/Landing/SignupForm";
import Footer from "../Components/FooterA";
import TPKIcon, { TPK } from "../res/iconTPK";

import { useGlobalStyles } from "../Styles/GlobalStyles";
import { ClassNameMap } from "@material-ui/styles";
import { PageHelpers } from "../Helpers/PageHelpers";
import Pop1 from "../res/pop_1.mp3";
import Pop2 from "../res/pop_2.mp3";

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
const Landing: React.FC<Props> = ({ theme }: Props) => {
  // .. Styles
  const classes = useStyles(theme);
  const globalClasses = useGlobalStyles(theme);

  // .. whether the user has just created an account or not
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSigninClicked = () => {
    delete localStorage.token;
    PageHelpers().GotoUrl("/signin");
  };

  // .. store a variety of sounds to use in an array to index one by one
  // at random when a link is hovered
  const handleLinkHover = () => {
    const pops = [Pop1, Pop2];
    const pop = pops[Math.floor(Math.random() * pops.length)];
    const audio = new Audio(pop);
    audio.play();
  };

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
              <TPKIcon icon={TPK.TPK} />
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
              {!isRegistered && (
                <Typography className={globalClasses.whiteTitle}>
                  Sign Up Now!
                </Typography>
              )}
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
              {!isRegistered && (
                <SignupForm onFinish={() => setIsRegistered(true)} />
              )}
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
                {!isRegistered && (
                  <Typography className={globalClasses.white14}>
                    Already a member?{" "}
                    <Link
                      className={classes.link}
                      onClick={() => PageHelpers().GotoUrl("/signin")}
                      onMouseEnter={handleLinkHover}
                    >
                      Sign In!
                    </Link>
                  </Typography>
                )}
                {isRegistered && (
                  <div style={{ height: 75 }}>
                    <Typography
                      className={globalClasses.white14}
                      style={{
                        fontSize: 22,
                        color: "#66FF33",
                        textAlign: "center",
                      }}
                    >
                      Thank you for registering!
                    </Typography>
                    <Typography
                      className={globalClasses.white14}
                      style={{ fontSize: 12, textAlign: "center" }}
                    >
                      {"You're all good to "}
                      <Link
                        className={classes.link}
                        onClick={handleSigninClicked}
                        onMouseEnter={handleLinkHover}
                      >
                        sign in
                      </Link>{" "}
                      using the details you provided!
                    </Typography>
                  </div>
                )}
              </Grid>
              {/* Use & Liability */}
              <Grid item style={{ marginTop: 10 }}>
                <Typography
                  className={globalClasses.white14}
                  style={{ textAlign: "center" }}
                >
                  Please read our{" "}
                  <Link
                    className={classes.link}
                    onClick={() => PageHelpers().GotoUrl("/legal")}
                    onMouseEnter={handleLinkHover}
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
                  style={{ fontSize: 11, textAlign: "center" }}
                >
                  By using Tapknack, you automatically agree to these terms!
                </Typography>
              </Grid>
              {/* Privacy Policy */}
              <Grid item style={{ marginTop: 10 }}>
                <Typography
                  className={globalClasses.white14}
                  style={{ textAlign: "center" }}
                >
                  View our{" "}
                  <Link
                    className={classes.link}
                    onClick={() => PageHelpers().GotoUrl("/privacy")}
                    onMouseEnter={handleLinkHover}
                  >
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

interface Props {
  theme: ClassNameMap<"root" | "link">;
  gotoUrl: (url: string) => void;
}

export default Landing;
