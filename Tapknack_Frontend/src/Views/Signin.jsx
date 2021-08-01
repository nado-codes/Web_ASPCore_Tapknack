import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { useGlobalStyles } from "../Styles/GlobalStyles";

import tpkIcon from "../res/tpk.png";
import ndcIcon from "../res/nadocoLogo.png";

const Signin = ({ theme }) => {
  const globalStyles = useGlobalStyles(theme);

  const TPKIcon = () => (
    <img
      src={tpkIcon}
      alt="TapKnack"
      style={{ width: "250px", height: "250px", objectFit: "contain" }}
    />
  );

  return (
    <Grid
      container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "red",
          width: "35%",
          position: "absolute",
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
        <Grid item></Grid>

        {/* Links */}
        <Grid item></Grid>
        {/* Footer */}
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
};

export default Signin;
