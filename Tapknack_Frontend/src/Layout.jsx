import React, { useEffect, useState } from "react";
import { Grid, Slide, Fade, Box } from "@material-ui/core";
import background from "./res/tpk_background.png";
import PropTypes from "prop-types";

const Layout = ({ children, /* testTransitions, */ exitTimeout }) => {
  // .. "isEnter=true" will trigger the ENTRANCE transition
  // .. If "isExit=true" at any time, exit transition will trigger
  const [isEnter, setIsEnter] = useState(window.location.hash === "#enter");
  const [isReturn, setIsReturn] = useState(window.location.hash === "#return");
  const [isExit, setIsExit] = useState(window.location.hash === "#exit");
  const isForceLoad = window.location.hash === "";

  useEffect(() => {
    // .. Hash change used to trigger transitions
    // .. TODO: Maybe we can use the URI (?) instead of hash? Is it ok?

    window.onhashchange = () => {
      setIsEnter(window.location.hash === "#enter");
      setIsExit(window.location.hash === "#exit");
      setIsReturn(window.location.hash === "#return");
    };
  }, []);

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        width: "100%",
        bottom: 0,
        top: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
        overflowX: "hidden",
      }}
    >
      {/* Display page content after transition */}
      <Fade
        in={(isEnter || isReturn || isForceLoad) && !isExit}
        timeout={{ enter: !isForceLoad ? 1500 : 0, exit: exitTimeout }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            top: 0,
          }}
        >
          <Slide
            direction={!isExit ? (!isReturn ? "left" : "right") : "right"}
            in={(isEnter || isReturn || isForceLoad) && !isExit}
            timeout={{ enter: !isForceLoad ? 750 : 0, exit: 750 }}
            mountOnEnter
            unmountOnExit
          >
            {children}
          </Slide>
        </div>
      </Fade>
    </Grid>
  );
};

Layout.propTypes = {
  exitTimeout: PropTypes.number.isRequired,
};

export default Layout;
