import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { NavItems } from "@/components/Header/NavItems";

interface NavItem {
	name: string;
	pathName: string;
	display: boolean;
}


interface MobileMenuProps {
	items: NavItem[];
	currentPath: string;
	role: string;
}

export function MobileMenu({ items, currentPath, role }: MobileMenuProps): JSX.Element {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="md:hidden" size="icon">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right">
				<nav className="flex flex-col space-y-4">
					<NavItems items={items} currentPath={currentPath} role={role} />
					<Link href="/login"
						  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80">
						Đăng nhập
					</Link>
					<Link href="/register"
						  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80">
						Đăng ký
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
}