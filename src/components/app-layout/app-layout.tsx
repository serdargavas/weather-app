import React, { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const AppLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default AppLayout;
