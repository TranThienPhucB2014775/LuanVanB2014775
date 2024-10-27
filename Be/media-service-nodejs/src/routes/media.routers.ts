import e, { Router } from 'express'
import { updateImage, uploadImage } from '~/controllers'
import { warpAsync } from '~/utils/handlers'
import {checkTenantRentingFromLandlord} from "~/middlewares/media.middlewares";
import express from "express";
import {UP_LOAD_IMG_CARD_ID_DIR} from "~/constants/dir.constants";
import { deleteImage } from '~/controllers/media.controller'

const mediaRouter = Router()

mediaRouter.post('/', warpAsync(uploadImage))
mediaRouter.put('/', warpAsync(updateImage))
mediaRouter.delete('/:imageName', warpAsync(deleteImage))


export default mediaRouter
