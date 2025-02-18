import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";
import contractApiRequest from "@/apiRequests/contract";
import { cookies } from "next/headers";
import LandlordInfo from "@/components/rental/rentalInfo/LandlordInfo";
import RoomMate from "@/components/rental/rentalInfo/RoomMate";
import RoomInfo from "@/components/rental/rentalInfo/RoomInfo";
import CurrentRoomHeader from "@/components/rental/CurrentRoomHeader";
import { contractResponses } from "@/dto/response/contract";
import PageAnimate from "@/components/PageAnimate";
import roomApiRequest from "@/apiRequests/room";
import ListInvoiceUnPaid from "@/components/manage/room/ListInvoiceUnPaid";

export default async function RentalPage({ roomId, contract }: {
	roomId: string;
	contract: contractResponses | undefined
}) {
	return (
		<PageAnimate>
			<div className="container mx-auto p-4 space-y-6">
				<h1 className="text-3xl font-bold">Thông tin phòng</h1>
				<CurrentRoomHeader roomId={roomId} apartmentId={contract?.apartmentId || ""}/>
				<div className="grid gap-6 md:grid-cols-2">
					{/*<MonthlyBills roomId={roomId} />*/}
					<Suspense fallback={<div>Loading...</div>}>
						<RoomMate roomId={roomId} />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<LandlordInfo landlordId={contract?.landlordId} />
					</Suspense>
					{/*<Suspense fallback={<div>Loading...</div>}>*/}
					{/*	<RoomInfo roomId={roomId} roomTypeId={contract?.roomTypeId}*/}
					{/*			  apartmentId={contract?.apartmentId} />*/}
					{/*</Suspense>*/}
				</div>
			</div>
		</PageAnimate>
	);
}