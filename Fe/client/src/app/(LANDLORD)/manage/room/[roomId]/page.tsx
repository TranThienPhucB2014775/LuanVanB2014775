import React, { Suspense } from "react";
import RoomDetail from "@/components/manage/room/RoomDetail";
import ListTenant from "@/components/manage/room/ListTenant";
import RoomPage from "@/components/manage/room/RoomPage";
import PageAnimate from "@/components/PageAnimate";

function Page({ params }: { params: { roomId: string } }) {
	return (
		<PageAnimate>
			<RoomPage roomId={params.roomId}>
				<Suspense fallback={<div>Loading...</div>}>
					<RoomDetail roomId={params.roomId} isManage={true} />
				</Suspense>
			</RoomPage>
		</PageAnimate>
	);
}

export default Page;