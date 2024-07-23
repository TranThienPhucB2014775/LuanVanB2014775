import e, { NextFunction, Request, Response } from 'express'
import { httpStatusCodes } from '~/constants/httpStatusCodes'
import { ApiResponse } from '~/dto/response'
import { ErrorDetails } from '~/exception'
import mediaService from '~/services/media.service'

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // console.log(req.query)
    const data = await mediaService.hanldelUploadImg(req)
    // eslint-disable-next-line no-extra-boolean-cast
    if (!Boolean(data)) {
      throw ErrorDetails.FILE_SIZE_TOO_LARGE
    }
    return res.status(httpStatusCodes.OK).json(
      new ApiResponse<any>(
        httpStatusCodes.OK,
        data.map((item) => item)
      )
    )
  } catch (err) {
    console.log('errorrr ' + err?.toString())
    throw err
  }
}

export const updateImage = async (req: Request, res: Response) => {
  console.log(req.body)
  res.json('Image updated')
}
