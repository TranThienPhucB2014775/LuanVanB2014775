import e, { Router } from 'express'
import { updateImage, uploadImage } from '~/controllers'
import { warpAsync } from '~/utils/handlers'
import {updateImageCardId, uploadImageCardId} from "~/controllers/mediaCardIdRouter.controller";
import {checkTenantRentingFromLandlord} from "~/middlewares/media.middlewares";
import express from "express";
import {UP_LOAD_IMG_CARD_ID_DIR} from "~/constants/dir.constants";
import mediaRouter from "~/routes/media.routers";

const mediaCardIdRouter = Router()

mediaCardIdRouter.post('/', warpAsync(uploadImageCardId))
mediaCardIdRouter.put('/', warpAsync(updateImageCardId))

export default mediaCardIdRouter
