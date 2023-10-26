import "@/styles/globals.css";
import { FC } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config.js";
import dayjs from "dayjs";
import Provider from "@/components/provider/provider";
require("dayjs/locale/tr");
dayjs.locale("tr");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(App, nextI18NextConfig as any) as any;
