import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import FormField from "../Components/FormField";
import Footer from "../Components/FooterA";
import { useGlobalStyles } from "../Styles/GlobalStyles";
import axios from "axios";

import TPKIcon, { TPK } from "../res/iconTPK";
import padlockIcon from "../res/ic/icPadlock_48.svg";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

// TODO: will use later
// import ndcIcon from "../res/nadocoLogo.png";

const PadlockIcon = () => (
  <img
    src={padlockIcon}
    alt="Padlock"
    style={{
      marginRight: -5,
      width: 32,
      height: 32,
      objectFit: "contain",
    }}
  />
);

const Signin: React.FC<Props> = ({ theme, gotoUrl }: Props) => {
  const globalStyles = useGlobalStyles(theme);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignupClicked = () => {
    gotoUrl("");
  };

  const handlePrivacyClicked = () => {
    gotoUrl("/privacy");
  };

  const handleSubmitClicked = async () => {
    console.log("you clicked submit!");
    setIsLoading(true);
    setError("");

    try {
      const token = btoa(`${username}:${pass}`);
      console.log("token=", token);

      const { data } = await axios.post(
        `api/signin`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("data=", data);
      localStorage.token = data.token;
    } catch (err) {
      setError("Login Failed, unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid
      container
      style={{
        display: "flex",
        position: "absolute",
        width: "100%",
        bottom: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "35%",
          position: "absolute",
          paddingTop: "50px",
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
          <TPKIcon size={200} icon={TPK.TPK} />
        </Grid>
        {/* Form */}
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            width: "100%",
          }}
        >
          {isLoading && (
            <CircularProgress
              size={40}
              style={{ position: "absolute", marginTop: "20px" }}
            />
          )}
          {error !== "" && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "middle",
                background: "rgba(255,0,0,0.75)",
              }}
            >
              <p className={globalStyles.white14} style={{ fontSize: 14 }}>
                {error}
              </p>
            </div>
          )}
          <Grid item style={{ opacity: `${isLoading ? "0.5" : "1"}` }}>
            {" "}
            {/* -25px */}
            <FormField
              label="abc"
              disabled={isLoading}
              value={username}
              labelMinWidth={30}
              textFieldMinWidth={0} // 250
              onChange={setUsername}
            />
            <FormField
              icon={<PadlockIcon />}
              type="password"
              disabled={isLoading}
              value={pass}
              labelMinWidth={30}
              textFieldMinWidth={0} // 250
              onChange={setPass}
            />
          </Grid>
          <Button
            className={globalStyles.genericButton}
            disabled={isLoading}
            onClick={handleSubmitClicked}
            style={{
              marginTop: "50px",
              width: "150px",
            }}
          >
            Login
          </Button>
        </Grid>

        {/* Links */}
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          {/* Sign In */}
          <Grid item>
            <Typography className={globalStyles.white14}>
              No account?{" "}
              <Link className={globalStyles.link} onClick={handleSignupClicked}>
                Sign Up!
              </Link>
            </Typography>
          </Grid>
          {/* Privacy Policy */}
          <Grid item style={{ marginTop: 10 }}>
            <Typography className={globalStyles.white14}>
              View our{" "}
              <Link
                className={globalStyles.link}
                onClick={handlePrivacyClicked}
              >
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          {/* Footer */}
          <Grid item style={{ width: "100%", marginTop: "30px" }}>
            <Footer />
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

export default Signin;
