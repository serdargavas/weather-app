import "@/styles/globals.css";
import { FC } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config.js";
import Provider from "@/components/provider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
require("dayjs/locale/tr");
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Istanbul");
dayjs.locale("tr");

export type PageProps = {};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    // App Provider
    <Provider pageProps={pageProps}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(App, nextI18NextConfig as any) as any;
