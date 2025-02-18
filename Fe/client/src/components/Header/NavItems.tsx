import Link from "next/link";
import React from "react";

interface NavItem {
	name: string;
	pathName: string;
	display: boolean;
}

interface NavItemsProps {
	items: NavItem[];
	currentPath: string;
	role: string;
}

export function NavItems({ items, currentPath, role }: NavItemsProps): JSX.Element {
	return (
		<>
			{items.map((item) => {
				if (!item.display || (item.pathName === "/manage" && role !== "ROLE_LANDLORD")) return null;
				return (
					<Link
						key={item.pathName}
						href={item.pathName}
						className={`transition-colors hover:text-foreground/80 ${
							currentPath === item.pathName ? "text-foreground" : "text-foreground/60"
						}`}
					>
						{item.name}
					</Link>
				);
			})}
		</>
	);
}