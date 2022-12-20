import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { BorderBox } from "../Components/BorderBox";
import { BtnBack } from "../Components/Profile/BtnBack";
import { SkillButton } from "../Components/SkillButton";
import { TPKHeader } from "../Components/TPKHeader";
import { PageHelpers } from "../Helpers/PageHelpers";
import TPKIcon, { TPK } from "../res/iconTPK";
import { useGlobalStyles } from "../Styles/GlobalStyles";

export const Profile: React.FC = () => {
  const globalStyles = useGlobalStyles();
  const { username } = localStorage;

  const skills = Array.from(Array(6).keys()).map((n) => ({
    name: `Unity 3D ${n}`,
  }));

  return (
    <>
      <TPKHeader />
      <Grid
        container
        style={{
          display: "flex",
          paddingTop: 75,
        }}
      >
        <Grid
          item
          style={{
            flex: 1 / 3,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {/* Back (Return) Button */}
          <BtnBack onClick={() => PageHelpers().ReturnToPrevUrl()} />
        </Grid>
        <Grid
          item
          style={{
            flex: 1 / 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Avatar + Skills*/}
          <BorderBox width={500} height={600} borderRadius={25}>
            <Grid
              container
              direction={"column"}
              style={{ display: "flex", padding: 20 }}
            >
              {/* Avatar + Username */}
              <Grid container style={{ flex: 1 / 3 }}>
                <Grid item>
                  <TPKIcon size={125} icon={TPK.icProfile} />
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    className={globalStyles.whiteTitle}
                    style={{
                      fontSize: 50,
                      marginTop: 0,
                      maxWidth: 50,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {username}
                    {/* TODO: need to be able to handle 60-character long strings without overflowing (use ellipsis) Sixty Sixty Sixty Sixty Sixty Sixty Sixty Sixty
                    Sixty Sixty Sixty */}
                  </Typography>
                </Grid>
              </Grid>
              {/* Skills */}
              <Grid
                container
                direction={"column"}
                style={{ flex: 2 / 3, display: "flex" }}
              >
                <Grid item style={{ height: 30, width: "100%" }}>
                  <Typography
                    className={globalStyles.white16}
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Your Skills
                  </Typography>
                </Grid>
                <Grid
                  container
                  style={{
                    maxHeight: 300,
                    overflow: "hidden",
                  }}
                >
                  {skills.map((s) => (
                    <Grid item style={{ marginTop: 10 }}>
                      <SkillButton name={s.name} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </BorderBox>
        </Grid>
        <Grid
          item
          style={{
            flex: 1 / 3,
          }}
        />
      </Grid>
    </>
  );
};
