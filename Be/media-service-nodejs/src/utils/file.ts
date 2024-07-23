import fs from 'fs'
import path from 'path'
import { NextFunction, Request, Response } from 'express'
import { File } from 'formidable'
import { UP_LOAD_IMG_DIR, UP_LOAD_TEMP_DIR } from '~/constants/dir.constants'
import { ErrorDetails } from '~/exception'

export const initFolder = () => {
  if (!fs.existsSync(UP_LOAD_TEMP_DIR)) {
    fs.mkdirSync(UP_LOAD_TEMP_DIR, {
      recursive: true
    })
  }
}

export const handleUplpadImgs = async (req: Request) => {
  const formidable = (await import('formidable')).default

  const form = formidable({
    maxFields: 4,
    uploadDir: UP_LOAD_TEMP_DIR,
    keepExtensions: true,
    maxFileSize: 400 * 1024,
    maxTotalFileSize: 400 * 1024 * 4,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image'))

      if (!valid) {
        form.emit('data', new Error('Invalid file type') as any)
      }

      return valid
    }
  })

  return new Promise<{ files: File[]; imageNames: string[] }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log('err ' + err.toString().includes('options.maxTotalFileSize'))
        if (err.toString().includes('options.maxFileSize')) {
          return reject(ErrorDetails.FILE_SIZE_TOO_LARGE)
        }
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(ErrorDetails.FILE_NOT_FOUND)
      }
      const { imageNames }: any = req.query
      console.log(imageNames)

      const imageNamesArr: string[] = []

      if (typeof imageNames === 'string') {
        if (1 !== (files.image as File[]).length) {
          return reject(ErrorDetails.FILE_NAME_NOT_MATCH)
        }
        imageNamesArr.push(imageNames)
      } else if (typeof imageNames === 'object') {
        if ((files.image as File[]).length !== (imageNames as string[]).length) {
          console.log((files.image as File[]).length)
          console.log((imageNames as File[]).length)
          imageNamesArr.push(...(imageNames as string[]))
          return reject(ErrorDetails.FILE_NAME_NOT_MATCH)
        }
      }

      resolve({ files: files.image as File[], imageNames: imageNamesArr })
    })
  })
}

export const getNameFromFullName = (fullName: string) => {
  const name = fullName.split('.')
  return name[0]
}
