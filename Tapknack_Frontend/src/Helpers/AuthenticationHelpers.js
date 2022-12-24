import axios from "axios";

export const AuthenticationHelpers = () => {
  const Authenticate = async () => {
    const { token } = localStorage;

    if (token === undefined) return false;

    try {
      const {
        data: { token: newToken },
      } = await axios.get(`/api/authentication`, {
        headers: {
          Authorization: token,
        },
      });

      console.log("newToken=", newToken);
      localStorage.token = newToken;
    } catch (err) {
      return false;
    }

    return true;
  };

  return {
    Authenticate,
  };
};
