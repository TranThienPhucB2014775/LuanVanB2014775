import MyProfile from "@/components/Profile/myprofile/MyProfile";
import {authApiRequest} from "@/apiRequests";
import {cookies} from "next/headers";

async function Page() {
    const cookieStore = cookies()

    async function getInfo() {
        const token = cookieStore.get('sessionToken')?.value ?? "";
        if (!token) return;
        const res = await authApiRequest.info(token);
        if (res.payload !== null && res.payload !== undefined && res.error === null) {
            return res.payload;
        }
    }

    const info = await getInfo();

    return (
        <MyProfile infoResponse={info}/>
    );
}

export default Page;
