import React from "react";

import TPK from "./iconTPK";
import { useGlobalStyles } from "../Styles/GlobalStyles";

const TPKIcon: React.FC<Props> = ({ size = 250, icon }: Props) => {
  const globalStyles = useGlobalStyles();

  return (
    <img
      className={globalStyles.noSelect}
      src={TPK.TPK} // .. need to use "icon" that was passed in
      alt="TapKnack"
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
};

interface Props {
  size: number;
  icon: string;
}

export default TPKIcon;
