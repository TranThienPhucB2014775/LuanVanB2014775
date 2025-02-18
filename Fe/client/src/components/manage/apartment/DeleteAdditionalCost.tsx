import React from "react";
import { LogOut, PencilIcon, Trash } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormAdditionalCost from "@/components/manage/apartment/FormAdditionalCost";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { additionalCostCreationRequest } from "@/dto/request/AdditionalCostRequest";
import additionalCostRequest from "@/apiRequests/additionalCost";
import { useToast } from "@/components/ui/use-toast";

function DeleteAdditionalCost(
	{ additionalCostId, deleteAdditionalCost }: {
		additionalCostId: string;
		deleteAdditionalCost: (additionalCostId: string) => void
	}
) {

	const {
		error: errorCreate,
		isFetching: isFetchingCreate,
		fetch: create
	} = useFetch<ApiResponse<null>>(
		(
			{
				additionalCostId,
				sessionToken
			}: {
				additionalCostId: string;
				sessionToken: string;
			}
		) => additionalCostRequest.deleteAdditionalCost({ additionalCostId, sessionToken })
	);

	const { toast } = useToast();

	async function handleDelete() {
		await create({ additionalCostId, sessionToken: localStorage.getItem("token") });
		deleteAdditionalCost(additionalCostId);
		toast({
			title: "Xóa thành công",
			description: "Đã xóa chi phí thành công"
		});
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="destructive"
					size="icon"
				>
					<Trash className="h-4 w-4" />
					<span className="sr-only">Xóa</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Bạn có chắc chắn muốn xóa không?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Hành động này không thể hoàn tác. Bạn sẽ rời khỏi phòng và không thể truy cập lại.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Xác nhận</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteAdditionalCost;