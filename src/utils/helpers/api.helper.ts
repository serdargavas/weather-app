import { AxiosError } from "axios";

export interface BackendError {
  message: string;
  code: number;
}

export const getError = (error: AxiosError): BackendError => {
  console.warn("getError", error);

  // Backend error
  if (
    error &&
    error.response &&
    error.response.data &&
    (error.response.data as any).message
  ) {
    const err: BackendError = error.response.data as any;
    return { message: err.message, code: err.code };
  }

  // Unknown error
  return { message: "Bilinmeyen Hata Oluştu", code: 100 };
};
