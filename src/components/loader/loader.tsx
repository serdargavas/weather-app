import { LoaderSvg } from "@/assets";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  isLoading: boolean;
};

const Loader: FC<Props> = ({ isLoading }) => {
  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key={`${isLoading ? "loader" : "loader-hidden"}`}
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 1,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 150,
              mass: 1.5,
            }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] bg-[rgba(255,255,255,0.8)] rounded-[16px] overflow-hidden flex justify-center items-center">
              <Image src={LoaderSvg} width={50} height={50} alt="loader-svg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Loader;
