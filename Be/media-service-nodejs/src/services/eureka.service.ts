import { Eureka } from 'eureka-js-client'

const port = Number(process.env.PORT)

const eurekaClient = new Eureka({
  instance: {
    app: 'media-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      $: 3001,
      '@enabled': true
    },
    vipAddress: 'media-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: 'localhost',
    port: 8070,
    servicePath: '/eureka/apps/'
  }
})

eurekaClient.start((error: any) => {
  if (error) {
    console.error('Error starting Eureka client:', error)
  } else {
    console.log('Eureka client started')
  }
})

const getServiceUrls = async (serviceName: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      const instances = eurekaClient.getInstancesByAppId(serviceName)
      const urls = instances.map((instance: any) => `http://${instance.hostName}:${instance.port.$}`)
      resolve(urls)
    } catch (error) {
      reject(error)
    }
  })
}

export { eurekaClient, getServiceUrls }