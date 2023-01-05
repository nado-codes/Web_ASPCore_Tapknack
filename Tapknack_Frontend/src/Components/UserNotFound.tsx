import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { useGlobalStyles } from "../Styles/GlobalStyles";
import TPKIcon, { TPK } from "../res/iconTPK";

export const UserNotFound: React.FC = () => {
  const globalStyles = useGlobalStyles();

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        <TPKIcon size={125} icon={TPK.icProfile} />
        <Typography
          className={globalStyles.whiteTitle}
          style={{ marginTop: "10px" }}
        >
          Whoops - we can't find them!
        </Typography>
        <br style={{ userSelect: "none" }} />
        <Typography
          className={globalStyles.whiteTitle}
          style={{ marginTop: "10px", fontSize: 18, fontWeight: "normal" }}
        >
          Maybe they're a bit shy?
        </Typography>
        <br style={{ userSelect: "none" }} />
        <Typography
          className={globalStyles.whiteTitle}
          style={{ marginTop: "10px", fontSize: 18 }}
        >
          Try a different username!
        </Typography>
      </Grid>
    </Grid>
  );
};
