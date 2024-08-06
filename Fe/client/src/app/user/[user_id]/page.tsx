"use client";

import React from "react";
import Image from "next/image";

import logoGoogle from "@/assets/images/Google.png";
import { useParams, useRouter } from "next/navigation";
import Pagination from "@/components/Pageinate";

export default function page() {
	const router = useRouter();
	const { page } = useParams();
	const { user_id } = useParams();

	const handlePageChange = ({ selected }: { selected: number }) => {
		router.push(`/user/${user_id}/?page=${selected + 1}`);
	};

	return (
		<div>
			<main>
				<div className="px-4 py-8 md:px-6 md:py-10 lg:py-12">
					<div className="mx-auto w-full max-w-6xl">
						<ul className="grid grid-cols-1 gap-16">
							<li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
								<a
									tabIndex={-1}
									href="/articles/hiking-through-the-woods"
								>
									<div
										className="relative bg-gray-100"
										style={{
											width: "100%",
											height: "auto",
										}}
									>
										<Image
											src={logoGoogle}
											alt="Hiking through the woods"
											width={3744}
											height={2808}
											className="object-cover"
										/>
									</div>
								</a>
								<div className="grid grid-cols-1 gap-3 md:col-span-2">
									<h2 className="font-sans font-semibold tracking-tighter text-slate-800 text-3xl md:text-4xl">
										<a href="/articles/hiking-through-the-woods">
											Hiking through the woods
										</a>
									</h2>
									<p className="font-serif italic tracking-tighter text-slate-500">
										Apr 12, 2022
									</p>
									<p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
										This is Rich Text, which includes both
										external links and links to internal
										documents. Links should be handled
										intelligently or everything might break.
										Don&#x27;t forget about media, too! Do
										your best to render images using an HTML
										Serializer. As you know hiking can be a
										very fulfilling orem ipsum dolor…
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</main>
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={5}
				currentPage={page as unknown as number}
			/>
		</div>
	);
}
