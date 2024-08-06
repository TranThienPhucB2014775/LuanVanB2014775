import React from "react";

import iconChecked from "@/assets/icons/Check.png";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";

// eslint-disable-next-line react/prop-types
function SideBar({
	Categories = [],
	sizes = [],
	arrange,
	setArrange,
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
		<div className="FilterSidebar lg:w-[300px] w-full lg:h-[828px] lg:pr-3 pt-6 pb-8 rounded-md border border-Neutral-B100 flex-col justify-start items-center gap-6 lg:inline-flex px-5">
			<div className="lg:w-[216px] w-full">
				<div className="Categories w-full flex-col justify-center items-start inline-flex ">
					<div className="Categories text-Neutral-N900 ct-text-primary mb-[16px]">
						Sắp xếp theo giá
					</div>
					<div className="CategoryItem self-stretch px-1 py-3 border-b border-gray-200 justify-start items-center gap-2 flex w-full">
						<div
							className="Checkbox justify-start items-center gap-2.5 flex"
							onClick={() => setArrange(arrange)}
						>
							<Checkbox id="terms" checked={arrange === "up"} />
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Nhỏ nhất
							</label>
						</div>
					</div>
					<div className="CategoryItem self-stretch px-1 py-3 border-b border-gray-200 justify-start items-center gap-2 flex w-full">
						<div
							className="Checkbox justify-start items-center gap-2.5 flex"
							onClick={() => setArrange(arrange)}
						>
							<Checkbox id="terms" checked={arrange === "down"} />
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Lớn nhất
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className="Category lg:w-[216px] w-full">
				<div className="Categories w-full flex-col justify-center items-start inline-flex">
					<div className="Categories text-Neutral-N900  ct-text-primary mb-[16px]">
						Categories
					</div>
					{Categories.map((Category) => {
						// console.log(Category.name)
						return (
							<div
								className="CategoryItem self-stretch px-1 py-3 border-b border-gray-200 justify-start items-center gap-2 flex w-full"
								key={Category.name}
							>
								<div className="Checkbox justify-start items-center gap-2.5 flex">
									<div
										className="Box w-[18px] h-[18px] relative cursor-pointer"
										onClick={() =>
											setCategories(Category.name)
										}
									>
										<Checkbox
											id="terms"
											checked={Category.checked}
										/>
									</div>
									<div className="Label ct- ct-text-primary font-normal text-Neutral-N600">
										{Category.name}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="Size lg:w-[216px] w-full">
				<div className="Size text-gray-900 text-sm font-medium leading-normal ct-text-primary">
					Size
				</div>
				<div className="Sizes w-full left-[-1px] top-[49px] justify-start items-start gap-2 inline-flex mt-[16px] flex-wrap">
					{sizes.map((size) => (
						<div
							key={size.sl}
							className={`SizeAttribute h-10 rounded cursor-pointer ${
								size.checked ? "border-[2px]" : "border-[1px]"
							} border-black flex-col 
                             justify-center items-center inline-flex`}
							onClick={() => setSizes(size.sl)}
						>
							<div className="w-[40px] h-[40px] SizeAttribute flex-col justify-center items-center inline-flex">
								<span
									className={`text-center ct-text-primary ${
										size.checked
											? "text-Neutral-B100"
											: "text-Neutral-B900"
									}`}
								>
									{size.sl}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default SideBar;
