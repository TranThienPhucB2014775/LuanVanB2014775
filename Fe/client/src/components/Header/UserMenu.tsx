"use client";

import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mediaLink } from "@/constants/media";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuLink } from "@/components/Header/MenuLink";
import { notificationApiRequest } from "@/apiRequests/notification";

interface UserMenuProps {
	isAuthenticated: boolean;
	avatarUrl: string;
	onLogout: () => Promise<void>;
}

export function UserMenu({ isAuthenticated, avatarUrl, onLogout }: UserMenuProps): JSX.Element {

	const [totalNotification, setTotalNotification] = useState(0);

	useEffect(() => {
		const fetchTotalNotification = async () => {
			if (!isAuthenticated) return;
			const response = await notificationApiRequest.getTotalNotification({
				sessionToken: localStorage.getItem("token") || ""
			});
			if (response.code === 0) {
				setTotalNotification(response.payload?.result || 0);
			}
		};

		// Gọi hàm ngay lập tức khi component được mount
		fetchTotalNotification();

		// Thiết lập interval để gọi hàm mỗi giây
		const intervalId = setInterval(fetchTotalNotification, 10000);

		// Dọn dẹp interval khi component bị unmount
		return () => clearInterval(intervalId);
	});

	if (isAuthenticated) {

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage src={`${mediaLink}/getImg/${avatarUrl}`} alt="User avatar" />
							<AvatarFallback>
								<User className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
						{totalNotification > 0 && (
							<span
								className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {totalNotification > 99 ? "99+" : totalNotification}
              </span>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<MenuLink href="/profile">Thông tin</MenuLink>
						<MenuLink href="/verification">Xác minh thông tin</MenuLink>
						<MenuLink href="/notification">
							Thông báo
							{totalNotification > 0 && (
								<span className="ml-auto rounded-full bg-red-500 px-2 text-xs text-white">
                  				{totalNotification}
                			</span>
							)}
						</MenuLink>
						<MenuLink href="/invite">Lời mời</MenuLink>
						<MenuLink href="/rental-rooms">Phòng của tôi</MenuLink>
						<MenuLink href="/manage-rental-post">Quản lý tin cho thuê</MenuLink>
						<MenuLink href="/manage-tenant-post">Quản lý tin tìm phòng</MenuLink>
						<MenuLink href="/reviews">Lịch sử đánh giá</MenuLink>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={onLogout}>
						Đăng xuất
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
	return (
		<>
			<Button variant="ghost" asChild className="hidden md:inline-flex">
				<Link href="/login">Đăng nhập</Link>
			</Button>
			<Button variant="default" asChild className="hidden md:inline-flex">
				<Link href="/register">Đăng ký</Link>
			</Button>
		</>
	);
}