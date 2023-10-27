import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  GetWeatherForecastParams,
  Weather,
} from "../interfaces/weather.interface";
import { WeatherQueryKeys } from "@/utils/enums/enums";
import AxiosHelper from "@/utils/helpers/axios.helper";

export const useGetWeatherForecast = (
  params: GetWeatherForecastParams,
  options?: Omit<UseQueryOptions<Weather>, "queryKey">
) => {
  type Response = Promise<Weather>;
  return useQuery(
    [WeatherQueryKeys.GetWeatherForecast, params],
    () =>
      AxiosHelper.instance.get("/data/2.5/weather", {
        params,
      }) as Response,
    options
  );
};
