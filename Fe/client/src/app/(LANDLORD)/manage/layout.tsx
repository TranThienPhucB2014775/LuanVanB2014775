import React from "react";
import PageAnimate from "@/components/PageAnimate";

function Layout({ children }: { children: React.ReactNode }) {


	return (
		<PageAnimate>
			<div className="container my-[32px]">
				{children}
			</div>
		</PageAnimate>
	);
}

export default Layout;