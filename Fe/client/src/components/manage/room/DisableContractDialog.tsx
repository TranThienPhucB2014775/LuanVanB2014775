"use client";

import React from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import contractApiRequest from "@/apiRequests/contract";
import { useToast } from "@/components/ui/use-toast";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { XCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function DisableContractDialog({ contractId }: { contractId: string }) {

	const { toast } = useToast();

	const {
		error: errorDisable,
		isFetching: isFetchingDisable,
		fetch: disable,
		reset: disableReset
	} = useFetch<ApiResponse<any>>(
		(data: {
			sessionToken: string,
			contractId: string,
		}) => contractApiRequest.disableContract(data)
	);

	async function handleDisable() {
		const res = await disable({
				sessionToken: localStorage.getItem("token") ?? "",
				contractId: contractId
			}
		);

		if (res?.code === 0) {
			toast({ description: "Kết thúc hợp đồng thành công" });
		} else {
			toast({ description: "Kết thúc hợp đồng thất bại" });
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div>
					<Button>
						<XCircle className="w-4 h-4 mr-2" />
						Kết thúc hợp đồng
					</Button>
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Bạn chắc chắn muốn kết thúc hợp đồng?</AlertDialogTitle>
					<AlertDialogDescription>
						Khi kết thúc thì không thể khôi phục lại hợp đồng như ban đầu
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction onClick={handleDisable}>Tiếp tục</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DisableContractDialog;