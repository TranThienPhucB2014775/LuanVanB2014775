import authApiRequest from '@/apiRequests/auth'
import {cookies} from 'next/headers'

export async function POST() {
    // const res = await request.json()
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    if (!sessionToken) {
        return Response.json(
            {message: 'Không nhận được session token'},
            {
                status: 401
            }
        )
    }

    const a = await authApiRequest.logoutFromNextServerToServer(sessionToken.value)
    console.log(a)

    return Response.json({},{
        status: 200,
        headers: {
            'Set-Cookie': `sessionToken=""; Path=/; HttpOnly; Max-Age=0`
        }
    })
}
