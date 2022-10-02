import React from "react";

export const TPKIconButton: React.FC<Props> = ({
  children,
  circular,
}: Props) => {
  console.log(circular, children);
  return (
    <button className={` bg-red-300`} style={{ background: "none" }}>
      ddd
    </button>
  );
};

interface Props {
  children: React.ReactNode | React.ReactNode[];
  circular?: boolean;
}
