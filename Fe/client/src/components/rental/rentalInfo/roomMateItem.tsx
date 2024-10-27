"use client";

import React, { useEffect, useState } from "react";
import { authApiRequest } from "@/apiRequests";
import { cookies } from "next/headers";
import envConfig from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { infoResponse } from "@/dto/response";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";

function RoomMateItem({ romMateId }: { romMateId: string }) {

	const [roomMate, setRoomMate] =
		useState<infoResponse | undefined>(undefined);

	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { userId: string; sessionToken: string }) =>
			authApiRequest.infoById({ ...data })
	);

	useEffect(() => {
		async function getInfo() {
			const res = await fetch({
				userId: romMateId,
				sessionToken: localStorage.getItem("token") || ""
			});
			if (res?.code === 0) {
				setRoomMate((res?.payload as infoResponse));
			} else if (error) {
				console.log(error);
			}
		}

		getInfo();
	}, []);


	return (
		<div className="flex items-center space-x-4">
			<Avatar>
				<AvatarImage src={`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/media/${roomMate?.result.imgAvatar}`}
							 alt="cn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-medium">{roomMate?.result.username}</p>
				<p className="text-sm text-muted-foreground">{roomMate?.result.email}</p>
			</div>
		</div>
	);
}

export default RoomMateItem;