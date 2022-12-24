import React from "react";

import { useGlobalStyles } from "../../Styles/GlobalStyles";

export const TPKDialogError: React.FC<Props> = ({ value }) => {
  const globalStyles = useGlobalStyles();

  return (
    <>
      {value !== "" && (
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
            {value}
          </p>
        </div>
      )}
    </>
  );
};

interface Props {
  value?: string;
}
