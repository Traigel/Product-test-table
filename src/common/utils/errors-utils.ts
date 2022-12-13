import {AxiosError} from "axios";

export const errorHandlerUtil = (e: any) => {
  const err = e as AxiosError<RootError>
  return err.message
}

// Types
export type RootError = {
  cod: string;
  message: string;
}