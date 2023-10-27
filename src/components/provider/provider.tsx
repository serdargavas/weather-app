"use client";
import { CONFIG } from "@/utils/constants/config";
import AxiosHelper from "@/utils/helpers/axios.helper";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { FC, ReactNode, useState } from "react";
import { Poppins } from "next/font/google";
import { PageProps } from "@/pages/_app";

type Props = {
  children?: ReactNode;
  pageProps: PageProps | any;
};

// Initialize axios instance
new AxiosHelper(CONFIG.API_URL as string);

// Initialize Poppins font
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const Provider: FC<Props> = ({ children, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            keepPreviousData: true,
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <main className={`${poppins.variable} font-poppins`}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      </QueryClientProvider>
    </main>
  );
};

export default Provider;
