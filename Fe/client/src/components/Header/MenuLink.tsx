import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface MenuLinkProps {
	href: string;
	children: React.ReactNode;
}

export function MenuLink({ href, children }: MenuLinkProps): JSX.Element {
	return (
		<DropdownMenuItem asChild>
			<Link href={href}>{children}</Link>
		</DropdownMenuItem>
	);
}