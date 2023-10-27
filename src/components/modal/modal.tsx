import { AnimatePresence, motion } from "framer-motion";
import React, { FC, HTMLAttributes, ReactNode } from "react";
import { useTranslation } from "next-i18next";
import { SlArrowUp } from "react-icons/sl";

export enum ModalPosition {
  Left = "left",
  Right = "right",
}

type Props = {
  visible: boolean;
  onVisibilityChange: (visible: boolean) => void;
  collapsedItem?: ReactNode;
  expandedItem?: ReactNode;
  position?: ModalPosition;
} & HTMLAttributes<HTMLDivElement>;

const Modal: FC<Props> = ({
  visible,
  onVisibilityChange,
  collapsedItem,
  expandedItem,
  position = ModalPosition.Right,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <>
      {collapsedItem && (
        <div
          className={`absolute px-6 py-6 bg-slate-100 shadow-lg rounded-[16px] bottom-5 z-[1] cursor-pointer ${
            position === ModalPosition.Left ? "left-5" : "right-5"
          }`}
        >
          <div {...props}>
            <div className="flex flex-col items-center gap-x-7 cursor-pointer">
              <div
                className="flex w-full flex-row flex-wrap justify-between items-center gap-x-7 cursor-pointer"
                onClick={() => onVisibilityChange(!visible)}
              >
                {collapsedItem}
                <div className="flex flex-row items-between gap-x-4">
                  <span className="text-[10px] text-slate-400">
                    {!visible ? t("expand") : t("collapse")}
                  </span>
                  <SlArrowUp
                    className={`${
                      visible && "rotate-180"
                    } transition-all duration-300 ease-in-out`}
                  />
                </div>
              </div>
              <AnimatePresence initial={false} mode="wait">
                {visible && (
                  <motion.div
                    key={`${visible}-modal`}
                    initial={{
                      height: 0,
                      width: 0,
                      opacity: 1,
                    }}
                    animate={{
                      height: "auto",
                      width: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      width: 0,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 150,
                      mass: 1.5,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="w-[300px] h-[300px] border-t-[1px] border-slate-300 mt-4 pt-4">
                      {expandedItem}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
