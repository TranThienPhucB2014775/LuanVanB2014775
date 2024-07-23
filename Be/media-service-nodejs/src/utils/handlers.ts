import { NextFunction, Request, Response } from 'express'

export const warpAsync = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      console.log(error)
      next(error)
    }
    // Promise.resolve(fn(req, res, next)).catch(next)
  }
}
