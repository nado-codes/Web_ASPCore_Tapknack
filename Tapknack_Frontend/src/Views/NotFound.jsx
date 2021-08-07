import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { useGlobalStyles } from "../Styles/GlobalStyles";

import tpkIcon from "../res/tpk.png";

const TPKIcon = () => (
  <img
    src={tpkIcon}
    alt="TapKnack"
    style={{ width: "250px", height: "250px", objectFit: "contain" }}
  />
);

const NotFound = ({ theme, returnToPrevUrl }) => {
  const globalStyles = useGlobalStyles(theme);

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
        <Button
          className={globalStyles.genericButton}
          style={{ width: "300px", marginTop: "20px" }}
          onClick={returnToPrevUrl}
        >
          Take me back!
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFound;
