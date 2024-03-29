import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Link, Typography } from "@material-ui/core";
import TPKFormField from "../Components/TPKFormField";
import Footer from "../Components/FooterA";
import { useGlobalStyles } from "../Styles/GlobalStyles";
import axios from "axios";
import * as DOMPurify from "dompurify";

import TPKIcon, { TPK } from "../res/iconTPK";
import padlockIcon from "../res/ic/icPadlock_48.svg";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { PageHelpers } from "../Helpers/PageHelpers";
import { ErrorHelpers } from "../Helpers/ErrorHelpers";
import { TPKButton } from "../Components/TPKButton";
import { AuthenticationHelpers } from "../Helpers/AuthenticationHelpers";
import Pop1 from "../res/pop_1.mp3";
import Pop2 from "../res/pop_2.mp3";

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
  const [isReturnToPrevURL, setIsReturnToPrevURL] = useState(false);
  const [error, setError] = useState("");

  // .. store a variety of sounds to use in an array to index one by one
  // at random when a link is hovered
  const handleLinkHover = () => {
    const pops = [Pop1, Pop2];
    const pop = pops[Math.floor(Math.random() * pops.length)];
    const audio = new Audio(pop);
    audio.play();
  };

  useEffect(() => {
    // .. try to signin with a prexisting token by validating it
    const loadAsync = async () => {
      try {
        const isAuthorized = await AuthenticationHelpers().Authenticate();
        isAuthorized && gotoUrl("/welcome");
      } catch (err) {
        const message = ErrorHelpers().GetErrorMessage(err);
        // .. if validation fails, stay on the signin page

        switch (message) {
          case "SESSION_EXPIRED":
            setError("Session expired. Please login again.");
            setIsReturnToPrevURL(true);
            delete localStorage.token;
            return;
          default: {
            setError("Unknown error. Please try again.");
            console.error(message);
            delete localStorage.token;
          }
        }
      }
    };

    document.title = "Tapknack - Signin";
    loadAsync();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (username === "") throw Error(`USERNAME_NULL`);
      if (pass === "") throw Error(`PASS_NULL`);
      if (username !== DOMPurify.sanitize(username)) {
        throw Error(`USERNAME_HTML`);
      }
      if (pass !== DOMPurify.sanitize(pass)) {
        throw Error(`PASS_HTML`);
      }

      delete localStorage.token;

      const signinToken = btoa(`${username}:${pass}`);

      const { data } = await axios.post(
        `api/signin`,
        {},
        {
          headers: {
            Authorization: signinToken,
          },
        }
      );
      const { token, userId, username: _username } = data;

      localStorage.token = token;
      localStorage.userId = userId;
      localStorage.username = _username;

      !isReturnToPrevURL && PageHelpers().GotoUrl("/welcome");
      isReturnToPrevURL && PageHelpers().ReturnToPrevUrl();
    } catch (err) {
      const message = ErrorHelpers().GetErrorMessage(err);

      switch (message) {
        case "USERNAME_NULL":
          setError(`Please provide a username`);
          break;
        case "PASS_NULL":
          setError(`Please provide a password`);
          break;
        case "USERNAME_HTML":
          setError(`Please enter a valid username`);
          break;
        case "PASS_HTML":
          setError(`Please enter a valid password`);
          break;
        case "USER_INVALID":
          setError(`No account exists for that username`);
          break;
        case "PASSWORD_FAIL":
          setError("Incorrect login credentials");
          break;
        default:
          setError("Unknown error. Please try again.");
          break;
      }

      console.error(message);
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
          justifyContent: "center",
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
              <p className={globalStyles.white16} style={{ fontSize: 14 }}>
                {error}
              </p>
            </div>
          )}
          <Grid item style={{ opacity: `${isLoading ? "0.5" : "1"}` }}>
            {/* -25px */}
            <TPKFormField
              label="abc"
              disabled={isLoading}
              value={username}
              labelMinWidth={30}
              textFieldMinWidth={0} // 250
              onChange={setUsername}
            />
            <TPKFormField
              icon={<PadlockIcon />}
              type="password"
              disabled={isLoading}
              value={pass}
              labelMinWidth={30}
              textFieldMinWidth={0} // 250
              onChange={setPass}
            />
          </Grid>
          <TPKButton
            disabled={isLoading}
            onClick={handleSubmit}
            style={{
              marginTop: "50px",
              width: "150px",
            }}
          >
            Login
          </TPKButton>
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
            <Typography className={globalStyles.white16}>
              No account?{" "}
              <Link
                className={globalStyles.link}
                onClick={() => PageHelpers().GotoUrl("")}
                onMouseEnter={handleLinkHover}
              >
                Sign Up!
              </Link>
            </Typography>
          </Grid>
          {/* Privacy Policy */}
          <Grid item style={{ marginTop: 10 }}>
            <Typography className={globalStyles.white16}>
              View our{" "}
              <Link
                className={globalStyles.link}
                onClick={() => PageHelpers().GotoUrl("/privacy")}
                onMouseEnter={handleLinkHover}
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
