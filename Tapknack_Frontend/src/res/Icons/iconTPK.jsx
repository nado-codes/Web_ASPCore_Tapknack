import React from "react";
import PropTypes from "prop-types";

import tpkIcon from "../tpk.png";
import { useGlobalStyles } from "../../Styles/GlobalStyles";

const TPKIcon = ({ size }) => {
  const globalStyles = useGlobalStyles();

  return (
    <img
      className={globalStyles.noSelect}
      src={tpkIcon}
      alt="TapKnack"
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
};

TPKIcon.propTypes = {
  size: PropTypes.number,
};

TPKIcon.defaultProps = {
  size: 250,
};

export default TPKIcon;
