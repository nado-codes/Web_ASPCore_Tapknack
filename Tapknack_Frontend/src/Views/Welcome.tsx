import React from "react";
import { Grid, Link, makeStyles, Typography } from "@material-ui/core";

import TPKIcon, { TPK } from "../res/iconTPK";
import { TPKIconButton } from "../Components/TPKIconButton";
import ndcIcon from "../res/nadocoLogo.png";

import { ClassNameMap } from "@material-ui/styles";

const BorderCircle: React.FC<BorderCircleProps> = ({
  size = 48,
  children,
  style,
}: BorderCircleProps) => (
  <div
    style={{
      width: size,
      height: size,
      display: "flex",
      justifyContent: "center",
      alignItems: "middle",
      border: "2px solid #28ACD9",
      borderRadius: 100,
      ...style,
    }}
  >
    {children}
  </div>
);

interface BorderCircleProps {
  size?: string | number;
  children?: React.ReactNode[] | React.ReactNode;
  style?: object;
}

const BorderBox: React.FC<BorderBoxProps> = ({
  width,
  height,
  children,
  style,
}: BorderBoxProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "middle",
      width,
      height,
      border: "2px solid #28ACD9",
      borderRadius: 10,
      ...style,
    }}
  >
    {children}
  </div>
);

interface BorderBoxProps {
  width: string | number;
  height: string | number;
  children?: React.ReactNode[] | React.ReactNode;
  style?: object;
}

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
    textDecoration: "underline",
    "&:active": {
      color: "white",
    },
  },
}));

const Welcome: React.FC<Props> = ({ theme, gotoUrl = () => null }: Props) => {
  // .. Styles
  const classes = useStyles(theme);

  return (
    <Grid
      container
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Grid
        item
        style={{
          display: "flex",
          flex: 0.125,
          height: "10px",

          justifyContent: "center",
        }}
      >
        {/* Logo - TapKnack */}
        <Grid
          item
          style={{
            flex: 1,
          }}
        />
        {/* Button Notifications, Logout, Profile, Options */}
        <TPKIcon size={75} icon={TPK.TPK} />
        <Grid
          item
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "end",
            paddingTop: "auto",
            borderBottom: "2px solid rgba(40,172,217,.5)",
          }}
        >
          <TPKIconButton style={{ marginTop: "auto", marginBottom: "auto" }}>
            <TPKIcon size={45} icon={TPK.icNotification} />
          </TPKIconButton>
          <TPKIconButton style={{ marginTop: "auto", marginBottom: "auto" }}>
            <TPKIcon size={45} icon={TPK.icLogout} />
          </TPKIconButton>
          <TPKIconButton style={{ marginTop: "auto", marginBottom: "auto" }}>
            <TPKIcon size={45} icon={TPK.icProfile} />
          </TPKIconButton>
          <TPKIconButton style={{ marginTop: "auto", marginBottom: "auto" }}>
            <TPKIcon size={45} icon={TPK.icOptions} />
          </TPKIconButton>
        </Grid>
      </Grid>
      {/* Center panel*/}
      <Grid
        item
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "10px",
        }}
      >
        {/* Welcome message */}
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "middle",
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TPKIcon size={64} icon={TPK.icProfile} />
          <h1
            style={{
              color: "white",
              marginLeft: 20,
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Nathan - Welcome Back!
          </h1>
        </Grid>

        {/* News */}
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "white", textAlign: "center" }}>
            Here's some stuff you missed...
          </p>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "2px solid rgba(40,172,217,.5)",
              borderTop: "2px solid rgba(40,172,217,.5)",
              paddingTop: 10,
              paddingBottom: 10,
              width: "75%",
              margin: "auto",
            }}
          >
            <TPKIconButton>
              <BorderBox width={150} height={100} style={{ marginRight: 10 }}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  News 1
                </p>
              </BorderBox>
            </TPKIconButton>
            <TPKIconButton>
              <BorderBox width={150} height={100} style={{ marginRight: 10 }}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  News 2
                </p>
              </BorderBox>
            </TPKIconButton>
            <TPKIconButton>
              <BorderBox width={150} height={100}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  News 3
                </p>
              </BorderBox>
            </TPKIconButton>
          </Grid>
        </Grid>
        {/* Button List Job, Find Job, Find Person */}
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "white", textAlign: "center" }}>
            What would you like to do first?
          </p>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <TPKIconButton>
              <BorderCircle size={200}>
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TPKIcon
                    size={128}
                    icon={TPK.icSuitcasePlus}
                    style={{ margin: "auto" }}
                  />
                  <p
                    style={{
                      color: "white",
                      fontSize: 20,
                      margin: "auto",
                      marginTop: -20,
                    }}
                  >
                    List A Job
                  </p>
                </Grid>
              </BorderCircle>
            </TPKIconButton>

            <TPKIconButton>
              <BorderCircle size={200}>
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TPKIcon
                    size={128}
                    icon={TPK.icSuitcaseSearch}
                    style={{ margin: "auto" }}
                  />
                  <p
                    style={{
                      color: "white",
                      fontSize: 20,
                      margin: "auto",
                      marginTop: -20,
                    }}
                  >
                    Find A Job
                  </p>
                </Grid>
              </BorderCircle>
            </TPKIconButton>
            <TPKIconButton>
              <BorderCircle size={200}>
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TPKIcon
                    size={128}
                    icon={TPK.icPersonSearch}
                    style={{ margin: "auto" }}
                  />
                  <p
                    style={{
                      color: "white",
                      fontSize: 20,
                      margin: "auto",
                      marginTop: -20,
                    }}
                  >
                    Find A Person
                  </p>
                </Grid>
              </BorderCircle>
            </TPKIconButton>
          </Grid>
        </Grid>
      </Grid>
      {/* Footer */}
      <Grid
        item
        style={{
          flex: 0.125,
          display: "flex",
          flexDirection: "row",
          height: "10px",
        }}
      >
        <Grid item style={{ flex: 3 / 4 }} />
        <Grid
          item
          style={{
            flex: 1 / 4,
            display: "flex",
          }}
        >
          <Grid
            item
            style={{
              flex: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 30,
            }}
          >
            <Link
              className={classes.link}
              style={{ fontSize: 12 }}
              onClick={() => gotoUrl("/privacy")}
            >
              Privacy and Terms
            </Link>
            <Link
              className={classes.link}
              style={{ fontSize: 12 }}
              onClick={() => gotoUrl("/about")}
            >
              What is TPK?
            </Link>
            <Link
              className={classes.link}
              style={{ fontSize: 12 }}
              onClick={() => gotoUrl("/careers")}
            >
              Join Us
            </Link>
          </Grid>
          <Grid
            item
            style={{
              flex: 70,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 10,
              paddingRight: 30,
              paddingBottom: 30,
            }}
          >
            <Typography
              style={{
                color: "#29E4FF",
                fontFamily: "Ubuntu",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              Brought to you by
            </Typography>
            <TPKIconButton>
              <img
                src={ndcIcon}
                style={{
                  display: "block",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </TPKIconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface Props {
  theme: ClassNameMap<"root" | "link">;
  gotoUrl: (url: string) => void;
}

export default Welcome;
