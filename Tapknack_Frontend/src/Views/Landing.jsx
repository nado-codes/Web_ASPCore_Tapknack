import React from "react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import SignupForm from "../Components/Landing/SignupForm";
import background from "../res/tpk_background.png";
import tpkIcon from "../res/tpk.png";
import ndcIcon from "../res/nadocoLogo.png";

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
    backgroundImage: `url(${background})`,
    backgroundSize: "contain",
  },
  img: {
    webkitUserSelect: "none",
    khtmlUserSelect: "none",
    mozUserSelect: "none",
    oUserSelect: "none",
    userSelect: "none",
  },
}));

const Landing = () => {
  const classes = useStyles();

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
            {/* Top Panel Left Content - Logo */}
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TPKIcon />
            </Grid>

            {/* Top Panel Left Content - Center Container */}
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* Top Panel Left Content - Title */}
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
                <Typography
                  style={{
                    color: "white",
                    fontFamily: "Ubuntu",
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  Welcome to TapKnack.com!
                </Typography>
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

              {/* Top Panel Left Content - Body */}
              <Grid
                item
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  marginTop: "20px",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "Ubuntu",
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  'TapKnack is the revolutionary new platform, connecting
                  students with valuable work experience in their chosen field
                  and connecting businesses/startups with the talent they so
                  desperately need'
                </Typography>
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
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid item style={{ flex: 0.1 }}>
              <Typography
                style={{
                  fontFamily: "Ubuntu",
                  textAlign: "center",
                  color: "white",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                Sign Up Now!
              </Typography>
            </Grid>

            {/* Top Panel Right - Form */}
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
          </Grid>
        </Grid>
      </Grid>

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

export default Landing;
