"use client";
import { CONFIG } from "@/utils/constants/config";
import AxiosHelper from "@/utils/helpers/axios.helper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode, useState } from "react";
import { Poppins } from "next/font/google";

type Props = {
  children?: ReactNode;
};

// Initialize axios instance
new AxiosHelper(CONFIG.API_URL as string);

const Provider: FC<Props> = ({ children }) => {
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

  const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    style: ["normal"],
    subsets: ["latin"],
    variable: "--font-poppins",
  });

  return (
    <main className={`${poppins.variable} font-poppins`}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </main>
  );
};

export default Provider;
