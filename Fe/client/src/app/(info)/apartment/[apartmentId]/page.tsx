import React, { Suspense } from "react";
import ApartmentDetail from "@/components/manage/apartment/ApartmentDetail";
import ApartmentPage from "@/components/manage/apartment/ApartmentPage";

function Page({ params }: { params: { apartmentId: string } }) {
	return (
		<div>
			{/*{params.apartmentId}*/}
			<ApartmentPage apartmentId={params.apartmentId} isManage={false}>
				<Suspense fallback={<div>Loading...</div>}>
					<ApartmentDetail apartmentId={params.apartmentId} isManage={false}/>
				</Suspense>
			</ApartmentPage>
		</div>
	);
}

export default Page;