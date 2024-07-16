import React from "react";
import Image from "next/image";

import img from "@/assets/img/1341519.jpeg";

function ListAdmin() {
	return (
		<div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
			<ul className="-mx-4">
				<li className="flex items-center">
					<Image
						className="w-10 h-10 object-cover rounded-full mx-4"
						width={40}
						src={img}
						alt="avatar"
					></Image>
					<p>
						<a
							className="text-gray-700 font-bold mx-1 hover:underline"
							href="#"
						>
							Alex John
						</a>
						<span className="text-gray-700 text-sm font-light">
							Created 23 Posts
						</span>
					</p>
				</li>
				<li className="flex items-center mt-6">
					<Image
						className="w-10 h-10 object-cover rounded-full mx-4"
						width={40}
						src={img}
						alt="avatar"
					></Image>
					<p>
						<a
							className="text-gray-700 font-bold mx-1 hover:underline"
							href="#"
						>
							Khatab Wedaa
						</a>
						<span className="text-gray-700 text-sm font-light">
							Created 332 Posts
						</span>
					</p>
				</li>
			</ul>
		</div>
	);
}

export default ListAdmin;
