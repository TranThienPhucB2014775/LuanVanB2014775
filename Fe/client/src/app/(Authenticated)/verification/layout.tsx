'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { CheckCircle, History } from "lucide-react";

const navItems = [
	{ href: "/verification", label: "Xác minh thông tin", icon: <CheckCircle /> },
	{ href: "/verification/history-verify-request", label: "Lịch sử yêu cầu xác minh", icon: <History /> },
	{ href: "/verification/verification-form", label: "Xác minh tài khoản", icon: <History /> },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isMobile = useMediaQuery({ maxWidth: 767 });

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto p-4">
				<nav className="mb-8 bg-white shadow-md rounded-lg p-4">
					<ul className="flex space-x-4">
						{navItems.map((item) => (
							<li key={item.href}>
								<Button
									asChild
									variant={pathname === item.href ? "default" : "ghost"}
								>
									<Link href={item.href}>
										{isMobile ? item.icon : item.label}
									</Link>
								</Button>
							</li>
						))}
					</ul>
				</nav>
				<main className="bg-white shadow-md rounded-lg p-6">{children}</main>
			</div>
		</div>
	);
}