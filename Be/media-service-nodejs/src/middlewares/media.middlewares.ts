import { Request, Response, NextFunction } from 'express'
import { jwtDecode } from 'jwt-decode'
import { getServiceUrls } from '~/services/eureka.service'

const checkTenantRentingFromLandlord = async (req: Request, res: Response, next: NextFunction) => {

  const imgUrl = req.url.split('/')[1].split('.')[0]
  const { authorization } = req.headers

  console.log(authorization)
  try {
    const decoded = jwtDecode((authorization as string).split(' ')[1])

    const landlordId = decoded.sub

    // @ts-ignore
    const { scope } = decoded

    console.log(scope)

    if (!imgUrl || !landlordId) {
      return res.status(400).json({ message: 'Missing tenantId or landlordId' })
    }

    if (scope !== 'ROLE_ADMIN') {
      const data = await getServiceUrls('IDENTITY-SERVICE')

      const isAccept = await fetch(
        `${data[0]}/verification-request/has-permission?imgUrl=${imgUrl}.jpg`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization as string
          }
        }
      )

      const responseBody = await isAccept.json()

      const { result } = responseBody
      console.log(responseBody)
      if (result === false) {
        return res.status(403).json({ code: 9998, result: 'Uncategorized error' })
      }
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Authorization denied' })
  }
}

export { checkTenantRentingFromLandlord }