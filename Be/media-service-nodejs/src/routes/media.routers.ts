import e, { Router } from 'express'
import { updateImage, uploadImage } from '~/controllers'
import { warpAsync } from '~/utils/handlers'

const mediaRouter = Router()

mediaRouter.post('/', warpAsync(uploadImage))
mediaRouter.put('/', warpAsync(updateImage))

export default mediaRouter
