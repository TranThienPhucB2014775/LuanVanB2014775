import express from 'express'
import mediaRouter from './routes/media.routers'
import { eurekaClient } from './services/eureka.service'
import { initFolder } from './utils/file'
import { globalException } from './exception'
import dotenv from 'dotenv'
import { UP_LOAD_IMG_CARD_ID_DIR, UP_LOAD_IMG_DIR } from './constants/dir.constants'
import mediaCardIdRouter from '~/routes/mediaCardId.routers'
import { checkTenantRentingFromLandlord } from '~/middlewares/media.middlewares'
import path from 'path'

dotenv.config()

const app = express()
const port = Number(process.env.PORT)

initFolder()

app.use(express.json())

app.use('/getImg', (req, res, next) => {
  const forbiddenPathPattern = /^\/[^\/]+\/.*$/
  if (forbiddenPathPattern.test(req.path)) {
    console.log('Access to subdirectories is forbidden')
    return res.status(403).send('Access to subdirectories is forbidden')
  }
  next()
}, express.static(UP_LOAD_IMG_DIR))

app.use('/media', mediaRouter)
app.use('/card-id', checkTenantRentingFromLandlord, express.static(UP_LOAD_IMG_CARD_ID_DIR))
app.use('/media/card-id', mediaCardIdRouter)

app.use(globalException)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Deregister the service when shutting down
process.on('SIGINT', () => {
  eurekaClient.stop((error: any) => {
    console.log('Eureka client stopped')
    process.exit()
  })
})