import e, { NextFunction, Request, Response } from 'express'
import { httpStatusCodes } from '~/constants/httpStatusCodes'
import { ApiResponse } from '~/dto/response'
import { ErrorDetails } from '~/exception'
import mediaService from '~/services/media.service'
import { UP_LOAD_IMG_DIR } from '~/constants/dir.constants'

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // console.log(req.query)
    const data = await mediaService.hanldelUploadImg(req, UP_LOAD_IMG_DIR)
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

export const deleteImage = async (req: Request, res: Response) => {
  const fs = require('fs')

  const imageName = req.params.imageName

  fs.unlinkSync(UP_LOAD_IMG_DIR + '/' + imageName)

  res.json(
    new ApiResponse<string>(
      0,
      'Image deleted'
    )
  )
}
