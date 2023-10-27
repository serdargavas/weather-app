import AppLayout from "@/components/app-layout";
import TurkeyMap from "@/components/turkey-map";
import { City } from "@/utils/helpers/turkey-map.helper";
import { GetStaticProps } from "next";
import { ForwardRefRenderFunction, forwardRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageProps } from "./_app";
import { Environment } from "@/utils/enums/enums";
import { i18n } from "next-i18next";
import WeatherInfoModal from "@/composite-components/weather-info-modal";

type Props = {};

const Home: ForwardRefRenderFunction<HTMLDivElement, Props> = ({}, ref) => {
  const [selectedCity, setSelectedCity] = useState<City>();
  const [hoveredCity, setHoveredCity] = useState<City>();

  return (
    <AppLayout ref={ref}>
      <TurkeyMap
        selectedCity={selectedCity}
        hoveredCity={hoveredCity}
        onCityChange={setSelectedCity}
        onCityHover={setHoveredCity}
      />
      <WeatherInfoModal
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />
    </AppLayout>
  );
};

export default forwardRef(Home);

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  if (process.env.NODE_ENV === Environment.Dev) {
    await i18n?.reloadResources();
  }

  return {
    props: {
      page: "index",
      ...(await serverSideTranslations(locale || "tr", ["common"])),
    },
  };
};
