import React from "react";

export const TPKIconButton: React.FC<Props> = ({
  children,
  circular,
}: Props) => {
  return <button className={`border-r-${circular ? 4 : 0}`}>{children}</button>;
};

interface Props {
  children: React.ReactNode | React.ReactNode[];
  circular?: boolean;
}
