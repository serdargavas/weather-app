import AppLayout from "@/components/app-layout";
import { ForwardRefRenderFunction, forwardRef } from "react";

type Props = {};

const Home: ForwardRefRenderFunction<HTMLDivElement, Props> = ({}, ref) => {
  return <AppLayout ref={ref}></AppLayout>;
};

export default forwardRef(Home);
