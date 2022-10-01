import React from "react";

import TPK from "./_iconTPK";
import { useGlobalStyles } from "../Styles/GlobalStyles";

const TPKIcon: React.FC<Props> = ({ size = 250, icon }: Props) => {
  const globalStyles = useGlobalStyles();

  return (
    <img
      className={globalStyles.noSelect}
      src={icon}
      alt="TapKnack"
      style={{
        width: size,
        height: size,
        background: "pink",
      }}
    />
  );
};

interface Props {
  size?: number;
  icon: string;
}

export { TPK };
export default TPKIcon;
