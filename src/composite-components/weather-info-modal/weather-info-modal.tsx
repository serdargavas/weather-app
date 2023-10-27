import { GetWeatherForecastParams } from "@/api/interfaces/weather.interface";
import { useGetWeatherForecast } from "@/api/services/weather.service";
import Modal from "@/components/modal";
import { ModalPosition } from "@/components/modal/modal";
import { CONFIG } from "@/utils/constants/config";
import { Language, MeasurementUnit } from "@/utils/enums/enums";
import { City } from "@/utils/helpers/turkey-map.helper";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { FC, ReactNode, useEffect, useState } from "react";

type Props = {
  selectedCity: City | undefined;
  onCityChange: (city: City) => void;
};

const WeatherInfoModal: FC<Props> = ({ selectedCity, onCityChange }) => {
  const { t } = useTranslation();
  const [isWeatherModalVisible, setIsWeatherModalVisible] = useState(false);
  const params: Omit<GetWeatherForecastParams, "q"> = {
    appId: CONFIG.OPEN_WEATHER_API_KEY || "",
  };

  const { data, isLoading } = useGetWeatherForecast(
    {
      ...params,
      q: selectedCity?.name as string,
      lang: Language.TR,
      units: MeasurementUnit.Metric,
    },
    { enabled: !!selectedCity, keepPreviousData: false, refetchOnMount: true }
  );

  useEffect(() => {
    setIsWeatherModalVisible(true);
  }, [selectedCity]);

  const weatherItem = (label: string, value: string, extra?: ReactNode) => {
    return (
      <div className="flex justify-between items-center">
        <div className="text-sm lg:text-base">{label}</div>
        <div className="text-sm lg:text-baste font-semibold">
          {value}
          {extra}
        </div>
      </div>
    );
  };

  return (
    <Modal
      visible={isWeatherModalVisible}
      onVisibilityChange={setIsWeatherModalVisible}
      loader={isLoading}
      position={ModalPosition.Right}
      collapsedItem={
        selectedCity && (
          <div>
            {selectedCity?.name} {selectedCity?.plateNumber}
          </div>
        )
      }
      expandedItem={
        <div className="flex flex-col relative">
          <AnimatePresence initial={false}>
            <motion.div
              key={`${data?.name}-content`}
              initial={{
                height: 0,
                width: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                width: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                width: 0,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 150,
                mass: 1.5,
              }}
            >
              {data && (
                <div className="flex flex-row items-center md:items-stretch justify-evenly w-full gap-x-5 md:flex-col">
                  <div className="py-2 lg:p-4 flex flex-col items-center lg:my-4 gap-y-3 lg:gap-y-6 w-3/12 md:w-auto">
                    <div className="bg-white shadow-lg rounded-[50%]">
                      <Image
                        key={data?.name}
                        src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
                        width={150}
                        height={150}
                        className="w-[70px] lg:w-[150px]"
                        alt="weather-icon"
                      />
                    </div>
                    <div className="text-sm md:text-lg font-semibold text-center">
                      {data?.name} {data?.main.temp}°
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1 lg:gap-y-3 w-7/12 md:w-auto">
                    {data && weatherItem(t("felt"), `${data.main.feels_like}°`)}
                    {data &&
                      weatherItem(
                        t("minTemperature"),
                        `${data?.main.temp_min}°`
                      )}
                    {data &&
                      weatherItem(
                        t("minTemperature"),
                        `${data?.main.temp_max}°`
                      )}
                    {data &&
                      weatherItem(t("windSpeed"), `${data?.wind.speed}m/s`)}
                    {data &&
                      weatherItem(
                        t("sunrise"),
                        `${dayjs.unix(data?.sys.sunrise).format("HH:mm")}`,
                        <div className="hidden md:inline">
                          , {dayjs.unix(data?.sys.sunset).fromNow()}
                        </div>
                      )}
                    {data &&
                      weatherItem(
                        t("sunset"),
                        `${dayjs.unix(data?.sys.sunset).format("HH:mm")}`,
                        <div className="hidden md:inline">
                          , {dayjs.unix(data?.sys.sunset).fromNow()}
                        </div>
                      )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      }
    />
  );
};

export default WeatherInfoModal;
