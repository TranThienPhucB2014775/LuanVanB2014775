import React, { useState } from "react";
import contractApiRequest from "@/apiRequests/contract";
import { contractResponses } from "@/dto/response/contract";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "../ui/dialog";
import { DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, DoorOpen, FileText, Home, Info, LayoutDashboard, User } from "lucide-react";
import { formatDate } from "@/util/formatDate";
import Link from "next/link";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

function InfoContract({ contractId }: { contractId: string }) {

	const [contract, setContract] = useState<contractResponses | undefined>(undefined);

	async function fetchContract() {
		const res = await contractApiRequest.getContractByContractId({
			contractId: contractId,
			sessionToken: localStorage.getItem("token") || ""
		});
		setContract(res.payload?.result);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={fetchContract}>
					<Info className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Thông tin hợp đồng</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<div className="flex items-center gap-2">
							<DoorOpen className="h-4 w-4" />
							<span className="font-medium">Tên phòng</span>
							<span
								className="text-sm text-muted-foreground">{contract?.roomName}</span>
						</div>
						<div className="flex items-center gap-2">
							<CalendarDays className="h-4 w-4" />
							<span className="font-medium">Ngày bắt đầu:</span>
							<span
								className="text-sm text-muted-foreground">{formatDate(contract?.startDate || "")}</span>
						</div>
						<div className="flex items-center gap-2">
							<CalendarDays className="h-4 w-4" />
							<span className="font-medium">Ngày kết thúc</span>
							<span
								className="text-sm text-muted-foreground">{formatDate(contract?.actualEndDate || "")}</span>
						</div>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center gap-2">
							<DollarSign className="h-4 w-4" />
							<span className="font-medium">Giá:</span>
							<span
								className="text-sm text-muted-foreground">{contract?.price.toLocaleString()} VND</span>
						</div>
						<div className="flex items-center gap-2">
							<DollarSign className="h-4 w-4" />
							<span className="font-medium">Tiền cọc:</span>
							<span
								className="text-sm text-muted-foreground">{contract?.depositAmount.toLocaleString()} VND</span>
						</div>
					</div>
					<div>
						<h4 className="font-medium mb-2">Mô tả</h4>
						<p className="text-sm text-muted-foreground">{contract?.description}</p>
					</div>
				</div>
				<div className="flex flex-row gap-2 justify-end">
					<Link
						href={`/apartment/${contract?.apartmentId}`}
					>
						<Button variant="outline">
							<BuildingOffice2Icon width={24} />
						</Button>
					</Link>
					<Link
						href={`/room-type/${contract?.roomTypeId}`
						}
					>
						<Button variant="outline">
							<LayoutDashboard width={24} />
						</Button>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default InfoContract;