import React from "react";
import PageAnimate from "@/components/PageAnimate";

function Layout({ children }: { children: React.ReactNode }) {
	return <PageAnimate>{children}</PageAnimate>;
}

export default Layout;
