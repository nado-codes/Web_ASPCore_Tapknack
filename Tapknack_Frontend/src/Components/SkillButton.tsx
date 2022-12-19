import { Grid, Typography } from "@material-ui/core";
import React from "react";
import TPKIcon, { TPK } from "../res/iconTPK";
import { useGlobalStyles } from "../Styles/GlobalStyles";
import { TPKIconButton } from "./TPKIconButton";

export const SkillButton: React.FC<Props> = ({ name }) => {
  const globalClasses = useGlobalStyles();

  return (
    <TPKIconButton style={{ width: 200 }}>
      <Grid container style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            background: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 75,
            height: 75,
            borderRadius: 75,
          }}
        >
          <TPKIcon size={50} icon={TPK.icNotification} />
        </div>
        <Typography
          className={globalClasses.white16}
          style={{ marginLeft: 20, fontSize: 20 }}
        >
          {name}
        </Typography>
      </Grid>
    </TPKIconButton>
  );
};

interface Props {
  name: string;
}
