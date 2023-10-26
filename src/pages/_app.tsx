import "@/styles/globals.css";
import { FC } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config.js";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { handleScrollTop } from "@/utils/helpers/window.helper";
import Provider from "@/components/provider";
require("dayjs/locale/tr");
dayjs.locale("tr");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const pageKey = router.asPath;

  return (
    // App Provider
    <Provider>
      <AnimatePresence
        initial={false}
        onExitComplete={handleScrollTop}
        mode="popLayout"
      >
        <Component key={pageKey} {...pageProps} />
      </AnimatePresence>
    </Provider>
  );
};

export default appWithTranslation(App, nextI18NextConfig as any) as any;
