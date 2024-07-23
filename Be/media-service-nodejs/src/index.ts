import express from 'express'
import mediaRouter from './routes/media.routers'
import { eurekaClient } from './services/eureka.service'
import { initFolder } from './utils/file'
import { globalException } from './exception'

const app = express()
const port = 3001

initFolder()
import dotenv from 'dotenv'
import { UP_LOAD_IMG_DIR } from './constants/dir.constants'
dotenv.config()

app.use(express.json())

app.use('/media', mediaRouter)
app.use(express.static(UP_LOAD_IMG_DIR))

app.use(globalException)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

eurekaClient.start((error) => {
  console.log('Eureka client started')
  if (error) {
    console.error('Error starting Eureka client:', error)
  }
})

// Deregister the service when shutting down
process.on('SIGINT', () => {
  eurekaClient.stop((error) => {
    console.log('Eureka client stopped')
    process.exit()
  })
})
