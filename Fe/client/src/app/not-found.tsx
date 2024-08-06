import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
	return (
		<div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
			<section className="section-sm text-center">
				<div className="container">
					<div className="row justify-center">
						<div className="sm:col-10 md:col-8 lg:col-6">
							<span className="text-[8rem] block font-bold text-dark dark:text-darkmode-dark">
								404
							</span>
							<h1 className="h2 mb-4">Page not found</h1>
							<div className="content">
								<p>
									The page you are looking for might have been
									removed, had its name changed, or is
									temporarily unavailable.
								</p>
							</div>
							<Link href="/">
								<Button className="mt-8">Về trang chủ</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default NotFound;
