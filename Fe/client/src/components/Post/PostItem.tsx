import React from "react";
import Image from "next/image";

import img from "@/assets/img/1341519.jpeg";

function PostItem() {
	return (
		<div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
			<div className="flex justify-between items-center">
				<span className="font-light text-gray-600">Jun 1, 2020</span>
				<a
					className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
					href="#"
				>
					Ninh Kiều, Cần Thơ
				</a>
			</div>
			<div className="mt-2">
				<a
					className="text-2xl text-gray-700 font-bold hover:underline"
					href="#"
				>
					Tìm trọ sinh viên gần Đại học Y Dược Cần Thơ
				</a>
				<p className="mt-2 text-gray-600">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Perspiciatis aliquid fugiat suscipit repellat hic dolorum et
					dolore asperiores inventore, amet quod fugit saepe, quos qui
					commodi iste? Unde, at magni?
				</p>
			</div>
			<div className="flex justify-between items-center mt-4">
				<a className="text-blue-500 hover:underline" href="#">
					Read more
				</a>
				<div>
					<a className="flex items-center" href="#">
						<Image
							src={img}
							alt={"ChevronRight"}
							className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
							height={40}
							width={40}
						/>

						<h1 className="text-gray-700 font-bold hover:underline">
							Phạm Văn Thanh
						</h1>
					</a>
				</div>
			</div>
		</div>
	);
}

export default PostItem;
