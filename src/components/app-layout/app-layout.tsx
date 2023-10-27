import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React, { forwardRef } from "react";
import Header from "./header";
import { useRouter } from "next/router";
import { handleScrollTop } from "@/utils/helpers/window.helper";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

const AppLayout = (
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef
) => {
  const router = useRouter();
  const pageKey = router.asPath;
  const onTheRight = { x: "100%" };
  const inTheCenter = { x: 0 };
  const onTheLeft = { x: "-100%" };

  const transition = { duration: 0.6, ease: "easeInOut" };

  return (
    <main className="h-[100vh] overflow-hidden">
      <Header />
      <AnimatePresence
        initial={false}
        onExitComplete={handleScrollTop}
        mode="popLayout"
      >
        <motion.div
          ref={ref}
          key={pageKey}
          initial={onTheRight}
          animate={inTheCenter}
          exit={onTheLeft}
          transition={transition}
          {...rest}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default forwardRef(AppLayout);
