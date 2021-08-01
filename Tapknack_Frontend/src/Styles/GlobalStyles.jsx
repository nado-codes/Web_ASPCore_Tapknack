import { makeStyles } from "@material-ui/core";

export const useGlobalStyles = makeStyles((theme) => ({
  white14: {
    fontFamily: "Ubuntu",
    color: "white",
    fontSize: 16,
  },
  whiteTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Ubuntu",
  },
  genericButton: {
    color: "#29E4FF",
    textTransform: "none",
    fontFamily: "Ubuntu",
    border: "2px solid #29E4FF",
    fontSize: 20,
    width: "200px",
    height: "50px",

    "&:disabled": {
      border: "2px solid #AAAAAA",
      color: "#AAAAAA",
    },
    "&:hover": {
      background: "rgba(40,172,217,0.75)",
      color: "white", //40 172 217
    },
    "&:active": {
      background: "#29E4FF",
      color: "white",
    },
  },
}));
