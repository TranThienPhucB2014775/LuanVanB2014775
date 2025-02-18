import {errorResponse} from "@/dto/response";

export type ApiResponse<T> = {
  code: number;
  payload: T | null ;
  error: errorResponse | null;
}
