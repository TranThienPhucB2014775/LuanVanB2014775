import React from "react";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import ApartmentItem from "@/components/manage/apartment/ApartmentItem";
import AnimatedSection from "@/components/AnimatedSection";

function ListApartment({ data, handleChangeData, isManage = false }:
						   { data: Array<apartmentResponse>, handleChangeData: Function, isManage?: boolean }) {

	return (
		<div className="text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
			{data !== undefined &&
				data.map((item: apartmentResponse) =>
					<AnimatedSection key={item.apartmentId}>
						<ApartmentItem
							handleChangeData={(apartment: apartmentResponse) => handleChangeData(apartment)}
							key={item.apartmentId}
							data={item}
							isManage={isManage}
						/>
					</AnimatedSection>

			)}
		</div>
	);
}

export default ListApartment;