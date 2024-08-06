import { Eureka } from 'eureka-js-client'

export const eurekaClient =(port: number) => new Eureka({
  instance: {
    app: 'media-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      $: port,
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
