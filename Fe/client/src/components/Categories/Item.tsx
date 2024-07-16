import React from "react";
import Image from "next/image";

import heart from "@/assets/icons/Heart.png";
import heartFull from "@/assets/icons/Heart full.png";
import PageAnimate from "@/components/PageAnimate";

function Item({ item }: { item: any }) {
	return (
		<PageAnimate>
			<div className="ProductCard w-[258px] rounded flex-col justify-center lg:justify-start items-start gap-6 inline-flex ">
				<div
					className="Image group w-[258px] h-[360px] rounded flex-col justify-center items-center flex
                                relative"
				>
					<Image
						className="Cover group-hover:opacity-60 w-[258px] h-[360px]"
						src="https://via.placeholder.com/275x360"
						alt={item.name}
						height={"360"}
						width={"258"}
					/>
					<div
						className="group-hover:block hidden absolute left-0
                bottom-0 bg-Neutral-N800 py-[12px] w-full text-center text-white ct-text-primary"
					>
						Liên Hệ Ngay
					</div>
					<Image
						src={heart}
						alt="logo"
						className="absolute h-[25px] top-[30px] right-[30px] bg-[#]"
						height={"25"}
						width={"25"}
					/>
				</div>
				<div className="Detail pr-2.5 pt-px justify-start items-center inline-flex">
					<div className="TitlePrice self-stretch flex-col justify-start items-start gap-3 inline-flex">
						<div className="ProductName ct-text-primary text-Neutral-N900">
							{item.name}
						</div>
						<div className="StartPrice w-[239px] justify-start items-center gap-4 inline-flex">
							<div className="Badge px-4 py-0.5 rounded-[100px] border border-Neutral-B100 justify-start items-start gap-2 flex cursor-pointer hover:border-black">
								<div className="TagName text-gray-900 text-xs font-medium font-['Inter'] capitalize leading-normal py-[4px]">
									Còn phòng
								</div>
							</div>
							<div className="3500 text-center ct-text-primary text-Neutral-B600">
								{item.price}
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageAnimate>
	);
}

export default Item;
