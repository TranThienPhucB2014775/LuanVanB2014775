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
		<Card
			className={cn(
				"transition-all duration-300 ease-in-out",
				isUnread
					? "border-blue-500 border-2 bg-blue-50 dark:bg-blue-950"
					: "bg-background"
			)}
		>
			<CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
				<Bell
					className={cn(
						"h-5 w-5",
						isUnread ? "text-blue-500" : "text-muted-foreground"
					)}
				/>
				<CardTitle
					className={cn(
						"text-base font-semibold",
						isUnread ? "text-blue-700 dark:text-blue-300" : "text-foreground"
					)}
				>
					{notification.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className={cn(
					"text-sm",
					isUnread ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
				)}>
					{notification.message}
				</p>
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
						className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300 dark:border-blue-700"
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