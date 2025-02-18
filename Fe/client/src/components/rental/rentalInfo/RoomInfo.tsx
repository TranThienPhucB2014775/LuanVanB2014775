import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Home, Info, MapPin, Bed, DoorClosed, LayoutDashboard } from "lucide-react";
import roomApiRequest from "@/apiRequests/room";
import { cookies } from "next/headers";
import apartmentApiRequest from "@/apiRequests/apartment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

async function RoomInfo({ roomId, roomTypeId, apartmentId }: {
	roomId: string;
	roomTypeId: string | undefined;
	apartmentId: string | undefined
}) {

	if (!roomTypeId || !apartmentId) {
		return null;
	}

	const cookieStore = cookies();

	const apartment = await apartmentApiRequest.getApartment({
		sessionToken: cookieStore.get("sessionToken")?.value ?? "",
		apartmentId: apartmentId
	});

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Thông tin nhà trọ</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="flex items-center space-x-2">
							<Home className="h-4 w-4 text-primary" />
							<span className="font-medium">{apartment.payload?.result.name}</span>
						</div>
						<div className="flex items-center space-x-2">
							<MapPin className="h-4 w-4 text-muted-foreground" />
							<span>{apartment.payload?.result.address}</span>
						</div>
						<div className="mt-4">
							<p className="text-sm text-muted-foreground">
								{apartment.payload?.result.description}
							</p>
						</div>
					</div>
					<CardFooter className="p-0 flex flex-row gap-2 justify-end">
						<Link
							href={`/apartment/${apartmentId}`}
						>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="outline" className="p-3">
											<BuildingOffice2Icon className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Thông tin khu trọ</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Link>
						<Link
							href={`/room-type/${roomTypeId}`}
						>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="outline" className="p-3">
											<LayoutDashboard className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Thông tin loại phòng trọ</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Link>
					</CardFooter>
				</CardContent>
			</Card>
		</>
	);
}

export default RoomInfo;