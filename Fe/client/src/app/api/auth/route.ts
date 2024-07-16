export async function POST(request: Request) {
    const body = await request.json()

    const sessionToken = body.sessionToken as string
    if (!sessionToken) {
        return Response.json(
            {message: 'Không nhận được session token'},
            {
                status: 400
            }
        )
    }

    const jwt = require("jsonwebtoken");
    const decoded = jwt.decode(sessionToken);

    const expires = new Date(decoded.exp * 1000)

    console.log(expires)


    return Response.json(body, {
        status: 200,
        headers: {
            'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expires}; SameSite=Lax; Secure`
        }
    })
}
