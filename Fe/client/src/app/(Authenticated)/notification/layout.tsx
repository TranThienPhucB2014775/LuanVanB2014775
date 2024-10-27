import React from "react";
import AnimatedSection from "@/components/AnimatedSection";

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AnimatedSection>
			{children}
		</AnimatedSection>
	);
}

export default Layout;