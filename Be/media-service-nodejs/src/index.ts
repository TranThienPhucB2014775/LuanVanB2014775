import express from 'express'
import mediaRouter from './routes/media.routers'
import { eurekaClient } from './services/eureka.service'
import { initFolder } from './utils/file'
import { globalException } from './exception'
import dotenv from 'dotenv'
import { UP_LOAD_IMG_DIR } from './constants/dir.constants'

dotenv.config()

const app = express()
const port = Number(process.env.PORT)

initFolder()

console.log("prt"+ port)
app.use(express.json())

app.use('/media', mediaRouter)
app.use(express.static(UP_LOAD_IMG_DIR))

app.use(globalException)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

eurekaClient(port).start((error) => {
  console.log('Eureka client started')
  if (error) {
    console.error('Error starting Eureka client:', error)
  }
})

// Deregister the service when shutting down
process.on('SIGINT', () => {
  eurekaClient(port).stop((error: any) => {
    console.log('Eureka client stopped')
    process.exit()
  })
})
