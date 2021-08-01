import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import { useGlobalStyles } from "../Styles/GlobalStyles";

import tpkIcon from "../res/tpk.png";

const TPKIcon = () => (
  <img
    src={tpkIcon}
    alt="TapKnack"
    style={{ width: "250px", height: "250px", objectFit: "contain" }}
  />
);

const NotFound = ({ theme }) => {
  const globalStyles = useGlobalStyles(theme);

  const handleLandingPageClicked = () => {};

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
      }}
    >
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "500px",
          height: "50%",
        }}
      >
        <TPKIcon />
        <Typography
          className={globalStyles.whiteTitle}
          style={{ marginTop: "10px" }}
        >
          Page Not Found
        </Typography>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Button
            className={globalStyles.genericButton}
            style={{ width: "300px", marginTop: "20px" }}
            onClick={handleLandingPageClicked}
          >
            Take me to the Landing Page!
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default NotFound;
