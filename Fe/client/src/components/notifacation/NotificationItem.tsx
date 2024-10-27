import React from "react";
import { NotificationResponse } from "@/dto/response/notification";
import { Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDate } from "@/util/formatDate";

interface NotificationItemProps {
	notification: NotificationResponse;
	markAsRead: (index: number) => void;
	index: number;
}

export default function NotificationItem({ notification, markAsRead, index }: NotificationItemProps) {
	const isUnread = !notification.isRead;

	return (
		<Card className={cn("transition-all duration-300 ease-in-out", isUnread ? "border-blue-500" : "")}>
			<CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
				<Bell className={cn("h-5 w-5", isUnread ? "text-blue-500" : "text-muted-foreground")} />
				<CardTitle className="text-base font-semibold">{notification.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">{notification.message}</p>
			</CardContent>
			<CardFooter className="flex justify-between items-center pt-2">
        <span className="text-xs text-muted-foreground">
          {formatDate(notification.createdAt)}
        </span>
				{isUnread && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => markAsRead(index)}
						className="flex items-center gap-2"
					>
						<CheckCircle className="h-4 w-4" />
						Đã đọc
						<span className="sr-only">Mark notification as read</span>
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}