import React, { useState } from "react";
import { TPKIconButton } from "../TPKIconButton";
import TPKIcon, { TPK } from "../../res/iconTPK";

export const BtnBack: React.FC<Props> = ({ onClick = () => null }) => {
  const [icon, setIcon] = useState(TPK.icBackUp);

  return (
    <TPKIconButton
      onMouseEnter={() => setIcon(TPK.icBackHover)}
      onMouseUp={() => setIcon(TPK.icBackHover)}
      onMouseDown={() => setIcon(TPK.icBackHover)}
      onMouseLeave={() => setIcon(TPK.icBackUp)}
      onClick={onClick}
    >
      <TPKIcon size={75} icon={icon} />
    </TPKIconButton>
  );
};

interface Props {
  onClick?: () => void;
}
