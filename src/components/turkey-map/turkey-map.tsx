import { City, cities } from "@/utils/helpers/turkey-map.helper";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";

type Props = {
  selectedCity: City | undefined;
  hoveredCity: City | undefined;
  onCityChange: (city: City) => void;
  onCityHover: (city: City | undefined) => void;
};

const TurkeyMap: FC<Props> = ({
  selectedCity,
  hoveredCity,
  onCityChange,
  onCityHover,
}) => {
  const [svgPositions, setSvgPositions] =
    useState<{ x: number; y: number }[]>();

  const handleCityPositions = () => {
    const cities = document.querySelectorAll(".city");
    const positions: { x: number; y: number }[] = [];

    cities.forEach((c) => {
      const pageOffset = window.scrollY;

      const offsetX =
        c.getBoundingClientRect().left +
        c.getBoundingClientRect().width / 2 -
        20;

      const offsetY =
        c.getBoundingClientRect().y +
        c.getBoundingClientRect().height / 2 +
        pageOffset -
        80;

      positions?.push({ x: offsetX, y: offsetY });
    });

    setSvgPositions(positions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    handleCityPositions();
    window.addEventListener("resize", handleCityPositions, false);
  }, []);

  return (
    <div className="z-[1] relative h-full w-full">
      <svg
        version="1.1"
        id="svg-turkiye-haritasi"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        viewBox={`0 80 1050 585`}
        className="w-full h-full m-0 relative z-[1]"
      >
        <AnimatePresence>
          {cities?.map((c) => (
            <motion.g
              key={c.id}
              name={c.name}
              className="city"
              onClick={() => onCityChange(c)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: c.plateNumber * 0.012,
              }}
            >
              <motion.path
                key={`${c.id}-path`}
                style={{
                  cursor: "pointer",
                  transition: ".2s ease-in",
                }}
                onMouseOver={() => onCityHover(c)}
                onMouseLeave={() => onCityHover(undefined)}
                fill={
                  selectedCity?.name === c.name
                    ? "#3066BE"
                    : hoveredCity?.name === c.name
                    ? "#c3cddc"
                    : "#E3E8EF"
                }
                d={c.path}
              />
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>
      <div className="absolute top-0 left-0 h-full w-[100vw]">
        {cities?.map(
          (c, idx) =>
            svgPositions && (
              <div
                key={c.name}
                style={{ left: svgPositions[idx].x, top: svgPositions[idx].y }}
                onClick={() => onCityChange(c)}
                className={`absolute text-center text-[10px] z-[1] cursor-pointer pointer-events-none ${
                  selectedCity?.id === c.id
                    ? "text-slate-300"
                    : "text-slate-950"
                }`}
              >
                {c.name}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TurkeyMap;
