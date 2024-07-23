import { NextFunction, Request, Response } from 'express'
import { ErrorCode } from './ErrorCode'
import { ApiResponse } from '~/dto/response'

export const globalException = (err: ErrorCode, req: Request, res: Response, next: NextFunction) => {
  const errorCodeService = Number(process.env.ERROR_CODE)
  console.log(errorCodeService)
  return res.status(err.statusCode).json(new ApiResponse(err.code + errorCodeService, err.message))
}
