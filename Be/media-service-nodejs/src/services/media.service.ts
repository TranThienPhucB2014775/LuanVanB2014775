import sharp from 'sharp'
import { Request } from 'express'
import fs from 'fs'

import { randomUUID } from 'crypto'
import { UP_LOAD_IMG_DIR } from '~/constants/dir.constants'
import { getNameFromFullName, handleUplpadImgs } from '~/utils/file'

class MediaService {
  async hanldelUploadImg(req: Request) {
    try {
      const files = await handleUplpadImgs(req)
      const { fileNames }: any = req.params
      console.log(files.imageNames)
      const result = Promise.all(
        files.files.map(async (file, temp) => {
          const fileName = getNameFromFullName(files.imageNames[temp])
          const newPath = `${UP_LOAD_IMG_DIR}/${fileName}.jpg`
          const info = await sharp(file.filepath).jpeg({ quality: 80 }).toFile(newPath)
          fs.unlink(file.filepath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting file:', unlinkErr)
            }
          })
          return files.imageNames + '.jpg'
        })
      )
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

const mediaService = new MediaService()

export default mediaService
