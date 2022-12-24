import React, { useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";
import * as DOMPurify from "dompurify";

import TPKFormField from "../TPKFormField";
import { TPKButton } from "../TPKButton";
import { ErrorHelpers } from "../../Helpers/ErrorHelpers";
import { TPKDialogError } from "../TPKDialog/TPKDialogError";

interface User {
  username: string;
  pass: string;
  email: string;
}

export const SignupForm: React.FC<Props> = ({
  onFinish = () => null,
}: Props) => {
  const labelMinWidth = 185;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitClicked = () => {
    setIsLoading(true);
    handleSubmit({ username, pass, email });
  };

  const handleSubmit = async ({ username, pass, email }: User) => {
    try {
      setError("");

      if (username === "") throw Error(`USERNAME_NULL`);
      if (pass === "") throw Error(`PASS_NULL`);
      if (passConfirm === "") throw Error(`CONFPASS_NULL`);
      if (pass !== passConfirm) throw Error(`PASS_NO_MATCH`);
      if (username !== DOMPurify.sanitize(username)) {
        throw Error(`USERNAME_HTML`);
      }
      if (email !== DOMPurify.sanitize(email)) {
        throw Error(`EMAIL_HTML`);
      }

      const { data } = await axios.post(`api/users`, {
        Username: username,
        Password: pass,
        Email: email,
      });

      if (!data)
        throw Error(
          `Expected 1 row to be updated in call to AddUser, got ${data}`
        );

      onFinish();

      return data;
    } catch (err) {
      const message = ErrorHelpers().GetErrorMessage(err);
      switch (message) {
        case "USERNAME_NULL":
          setError(`Please provide a username`);
          break;
        case "PASS_NULL":
          setError(`Please provide a password`);
          break;
        case "CONFPASS_NULL":
          setError(`Please confirm your password`);
          break;
        case "USERNAME_HTML":
          setError(`Please enter a valid username`);
          break;
        case "EMAIL_HTML":
          setError(`Please enter a valid email`);
          break;
        case "PASS_NO_MATCH":
          setError(`The passwords do not match`);
          break;
        case "USERNAME_DUPLICATE":
          setError(`That username is already in use`);
          break;
        case "EMAIL_DUPLICATE":
          setError(`That email is already in use`);
          break;
        default:
          setError(message.includes("_") ? message : "Unknown Error");
      }

      console.error(err);
      console.error(message);
    } finally {
      setIsLoading(false);
    }

    // .. TODO: Goto "Dashboard"
  };

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10px",
      }}
    >
      <Grid
        item
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <CircularProgress size={40} style={{ position: "absolute" }} />
        )}
        {/* Top - Form Fields */}
        <Grid
          container
          style={{
            display: "flex",
            width: "75%",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <TPKDialogError value={error} />
          <TPKFormField
            label="Create Your Username"
            disabled={isLoading}
            value={username}
            labelMinWidth={labelMinWidth}
            onChange={setUsername}
          />
          <TPKFormField
            label="Create Your Password"
            type="password"
            disabled={isLoading}
            value={pass}
            labelMinWidth={labelMinWidth}
            onChange={setPass}
          />

          <TPKFormField
            label="Confirm Your Password"
            type="password"
            disabled={isLoading}
            value={passConfirm}
            labelMinWidth={labelMinWidth}
            onChange={setPassConfirm}
          />

          <TPKFormField
            label="Enter Your Email"
            disabled={isLoading}
            value={email}
            labelMinWidth={labelMinWidth}
            onChange={setEmail}
          />
        </Grid>
      </Grid>
      {/* Bottom - Submit */}
      <Grid item>
        <TPKButton
          disabled={isLoading}
          onClick={handleSubmitClicked}
          style={{
            marginTop: 20,
          }}
        >
          Submit
        </TPKButton>
      </Grid>
    </Grid>
  );
};

interface Props {
  onFinish?: () => void;
}
