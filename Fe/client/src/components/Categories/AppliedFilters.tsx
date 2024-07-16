import React from "react";
import close from "@/assets/icons/close.png";
import Image from "next/image";

function AppliedFilters({
	Categories = [],
	sizes = [],
	arrange = "up",
	setCategories,
	setSizes,
}: {
	Categories: any[];
	sizes: any[];
	arrange: string;
	setArrange: any;
	setCategories: any;
	setSizes: any;
}) {
	return (
		<div className="AppliedFilters w-full px-[21px] box-border">
			<div className="AppliedFilters ">
				<span className="text-black text-sm font-medium font-['Inter'] leading-normal">
					Applied Filters:
				</span>
			</div>
			<div className="Filters justify-start items-start gap-3 mt-[12px] flex flex-wrap">
				{Categories.map(
					(item) =>
						item.checked && (
							<div
								key={item.name}
								className="Badge px-4 py-0.5 rounded-[100px] border border-gray-200 justify-start items-center gap-2 flex"
							>
								<div className="TagName text-gray-900 text-xs font-medium font-['Inter'] capitalize leading-normal">
									{item.name}
								</div>
								<div
									className="X w-[22px] h-8 justify-center items-center gap-2.5 flex cursor-pointer"
									onClick={() => setCategories(item.name)}
								>
									<Image
										src={close}
										alt={"close"}
										className="Close w-3 h-3"
										height={"12"}
										width={"12"}
									/>
								</div>
							</div>
						)
				)}
				{sizes.map(
					(item) =>
						item.checked && (
							<div
								key={item.sl}
								className="Badge px-4 py-0.5 rounded-[100px] border border-gray-200 justify-start items-center gap-2 flex"
							>
								<div className="TagName text-gray-900 text-xs font-medium font-['Inter'] capitalize leading-normal">
									SL: {item.sl}
								</div>
								<div
									className="X w-[22px] h-8 justify-center items-center gap-2.5 flex cursor-pointer"
									onClick={() => setSizes(item.sl)}
								>
									<Image
										src={close}
										alt={"close"}
										height={"12"}
										width={"12"}
									/>
								</div>
							</div>
						)
				)}
			</div>
			<div className="flex justify-between">
				<span className="capitalize text-[12px] leading-[2] text-Neutral-N500 mt-[15px] inline-block">
					Hiển thị 1-9 trong 36 Sản phẩm.
				</span>
				<span className="capitalize text-[12px] leading-[2] text-Neutral-N500 mt-[15px] inline-block capitalize">
					Sắp xếp theo {arrange === "up" && "Nhỏ Nhất"}{" "}
					{arrange === "down" && "Lớn Nhất"}
				</span>
			</div>
		</div>
	);
}

export default AppliedFilters;
