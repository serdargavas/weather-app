import Modal from "@/components/modal";
import { ModalPosition } from "@/components/modal/modal";
import { City } from "@/utils/helpers/turkey-map.helper";
import { useTranslation } from "next-i18next";
import React, { FC, useEffect, useState } from "react";

type Props = {
  selectedCity: City | undefined;
  onCityChange: (city: City) => void;
};

const WeatherInfoModal: FC<Props> = ({ selectedCity, onCityChange }) => {
  const { t } = useTranslation();
  const [isWeatherModalVisible, setIsWeatherModalVisible] = useState(false);

  useEffect(() => {
    setIsWeatherModalVisible(true);
  }, [selectedCity]);

  return (
    <Modal
      visible={isWeatherModalVisible}
      onVisibilityChange={setIsWeatherModalVisible}
      position={ModalPosition.Right}
      collapsedItem={
        selectedCity && (
          <div>
            {selectedCity?.name} {selectedCity?.plateNumber}
          </div>
        )
      }
      expandedItem={
        <div className="flex flex-col">
          <div>20°</div>
          <div>{t("felt")} 18°</div>
        </div>
      }
    />
  );
};

export default WeatherInfoModal;
