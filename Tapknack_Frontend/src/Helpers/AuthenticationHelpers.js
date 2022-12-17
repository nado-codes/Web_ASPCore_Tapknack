import axios from "axios";

export const AuthenticationHelpers = () => {
  const Authenticate = async () => {
    return true;
    const { token } = localStorage;

    if (token === undefined) return false;

    const {
      data: { token: newToken },
    } = await axios.get(`/api/authentication`, {
      headers: {
        Authorization: token,
      },
    });

    console.log("newToken=", newToken);
    localStorage.token = newToken;

    return true;
  };

  return {
    Authenticate,
  };
};
