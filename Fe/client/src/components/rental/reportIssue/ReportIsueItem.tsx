import React, { useEffect, useState } from "react";
import { ReportIssueResponse } from "@/dto/response/ReportIssueResponse";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, LayoutDashboard, MoreVertical, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { infoResponse } from "@/dto/response";
import { authApiRequest } from "@/apiRequests";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ReportIssueStatus = [
	{
		value: "PENDING",
		label: "Chờ xử lý"
	},
	{
		value: "IN_PROGRESS",
		label: "Đang xử lý"
	},
	{
		value: "RESOLVED",
		label: "Đã xử lý"
	},
	{
		value: "CLOSED",
		label: "Đã đóng"
	}
];

function ReportIssueItem(
	{ issue, isManage = false, onChangeStatus }: {
		issue: ReportIssueResponse;
		isManage?: boolean;
		onChangeStatus: Function
	}) {

	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { userId: string; sessionToken: string }) =>
			authApiRequest.infoById({ ...data })
	);

	const [user, setUser] = useState<infoResponse | undefined>(undefined);

	useEffect(() => {
		async function getInfo() {

			const res = await fetch({
				userId: issue.tenantId,
				sessionToken: localStorage.getItem("token") || ""
			});
			if (res?.code === 0) {
				setUser((res?.payload as infoResponse));
			} else if (error) {
				console.log(error);
			}
		}

		getInfo();
	}, []);

	const handleStatusChange = (newStatus: string) => {
		console.log(issue.reportIssueId);
		onChangeStatus({
			reportIssueId: issue.reportIssueId,
			status: newStatus
		});

	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-2xl font-bold">{issue.title}</CardTitle>
				<Badge
					variant={issue.status === "IN_PROGRESS" ? "default" : "secondary"}
					className="ml-2"
				>
					{ReportIssueStatus.find((status) => status.value === issue.status)?.label}
				</Badge>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground mb-4">{issue.description}</p>
				<div className="flex items-center space-x-4">
					<Avatar className="h-10 w-10">
						<AvatarImage src={user?.result.imgAvatar} alt={user?.result.username} />
						<AvatarFallback>{user?.result.username.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-sm font-medium">{user?.result.username}</p>
						<p className="text-xs text-muted-foreground">{user?.result.email}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				<div className="flex space-x-2">
					<Link href={`/user/${user?.result.id}`}>
						<Button size="sm" variant="outline">
							<User className="h-5 w-5 " />
						</Button>
					</Link>
					<Link href={isManage ? `/manage/${issue.apartmentId}` : `/apartment/${issue.apartmentId}`}>
						<Button size="sm" variant="outline">
							<Building2 className="h-5 w-5" />
						</Button>
					</Link>
					<Link href={isManage ? `/manage/room-type/${issue.roomTypeId}` : `/apartment/${issue.apartmentId}`}>
						<Button size="sm" variant="outline">
							<BuildingOffice2Icon className="h-5 w-5" />
						</Button>
					</Link>
					<Link href={isManage ? `/manage/room/${issue.roomId}` : `/apartment/${issue.apartmentId}`}>
						<Button size="sm" variant="outline">
							<LayoutDashboard className="h-5 w-5" />
						</Button>
					</Link>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm">
							<MoreVertical className="h-4 w-4" />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{ReportIssueStatus.map((status) => (
							<DropdownMenuItem
								key={status.value}
								onClick={() => handleStatusChange(status.value)}
							>
								Thay đổi thành: {status.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</CardFooter>
		</Card>
	);
}

export default ReportIssueItem;