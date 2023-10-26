import { HTMLMotionProps, motion } from "framer-motion";
import React, { forwardRef } from "react";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

const AppLayout = (
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef
) => {
  const onTheRight = { x: "100%" };
  const inTheCenter = { x: 0 };
  const onTheLeft = { x: "-100%" };

  const transition = { duration: 0.6, ease: "easeInOut" };

  return (
    <motion.div
      ref={ref}
      initial={onTheRight}
      animate={inTheCenter}
      exit={onTheLeft}
      transition={transition}
      {...rest}
      className="h-[100vh] overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default forwardRef(AppLayout);
