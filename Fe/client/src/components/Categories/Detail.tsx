import React from "react";

function Detail() {
	return (
		<div className="Product w-[1092px] h-[574px] relative">
			<div className="Details w-[438px] h-[562px] left-[654px] top-[4px] absolute">
				<div
					className="FreeShippingOnOrders100 left-[1px] top-[533px] absolute text-center text-gray-600 text-xs font-medium font-['Inter'] uppercase
                    leading-normal tracking-wide"
				>
					— Free shipping on orders $100+
				</div>
				<div className="Whishlist w-[43px] h-[43px] left-[301px] top-[477px] absolute rounded border border-gray-200 justify-center items-center gap-2.5 inline-flex">
					<div className="Heart w-6 h-6 py-0.5 justify-center items-center gap-2.5 flex" />
				</div>
				<div className="Button w-[284px] h-11 px-6 py-3 left-[1px] top-[477px] absolute bg-gray-900 rounded justify-center items-center gap-1.5 inline-flex">
					<div className="ButtonLabel text-white text-sm font-medium font-['Inter'] leading-normal">
						Add to cart
					</div>
				</div>
				<div className="Quantity w-[164px] h-[78px] left-0 top-[359px] absolute">
					<div className="QuantityInput w-[164px] h-11 px-4 left-0 top-[34px] absolute rounded border border-gray-200 justify-between items-center inline-flex">
						<div className="relative w-5 h-5 Minus" />
						<div className=" text-center text-gray-800 text-sm font-medium font-['Inter'] leading-normal">
							1
						</div>
						<div className="relative w-5 h-5 Add" />
					</div>
					<div className="Quantity left-0 top-0 absolute text-center text-gray-600 text-xs font-medium font-['Inter'] uppercase leading-normal tracking-wide">
						Quantity
					</div>
				</div>
				<div className="SizeAttribute w-[243px] h-[76px] left-0 top-[251px] absolute">
					<div className="Sizes left-0 top-[34px] absolute justify-start items-end gap-2 inline-flex">
						<div className="inline-flex flex-col items-center justify-center h-10 border border-gray-900 rounded SizeAttribute">
							<div className="S text-center text-gray-900 text-xs font-medium font-['Inter'] capitalize leading-normal">
								S
							</div>
						</div>
						<div className="inline-flex flex-col items-center justify-center h-10 border border-gray-200 rounded SizeAttribute">
							<div className="S text-center text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-normal">
								M
							</div>
						</div>
						<div className="inline-flex flex-col items-center justify-center h-10 border border-gray-200 rounded SizeAttribute">
							<div className="S text-center text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-normal">
								X
							</div>
						</div>
						<div className="inline-flex flex-col items-center justify-center h-10 border border-gray-200 rounded SizeAttribute">
							<div className="S text-center text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-normal">
								XL
							</div>
						</div>
						<div className="inline-flex flex-col items-center justify-center h-10 border border-gray-200 rounded SizeAttribute">
							<div className="S text-center text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-normal">
								XXL
							</div>
						</div>
					</div>
					<div className="SelectSize left-0 top-0 absolute text-center text-gray-600 text-xs font-medium font-['Inter'] uppercase leading-normal tracking-wide">
						Select Size
					</div>
				</div>
				<div className="ColorAttribute w-[152px] h-[76px] left-0 top-[159px] absolute">
					<div className="Colors left-0 top-[34px] absolute justify-center items-center gap-2.5 inline-flex">
						<div className="ColorAttribute w-8 h-8 rounded-[100px] border border-gray-900 justify-center items-center gap-2 flex">
							<div className="Frame2 w-6 h-6 bg-indigo-300 rounded-[100px]" />
						</div>
						<div className="ColorAttribute w-8 h-8 rounded-[100px] justify-center items-center gap-2 flex">
							<div className="Frame2 w-6 h-6 bg-amber-200 rounded-[100px]" />
						</div>
						<div className="ColorAttribute w-8 h-8 rounded-[100px] justify-center items-center gap-2 flex">
							<div className="Frame2 w-6 h-6 bg-neutral-400 rounded-[100px]" />
						</div>
					</div>
					<div className="AvailableColors left-0 top-0 absolute text-center text-gray-600 text-xs font-medium font-['Inter'] uppercase leading-normal tracking-wide">
						Available Colors
					</div>
				</div>
				<div className="7500 left-0 top-[105px] absolute text-center text-gray-900 text-lg font-semibold font-['Inter']">
					$75.00
				</div>
				<div className="ReviewCountStock pr-2 left-0 top-[53px] absolute rounded-[100px] justify-start items-center gap-2 inline-flex">
					<div className="Badge px-4 py-0.5 bg-neutral-100 rounded-[100px] border border-neutral-100 justify-start items-start gap-2 flex">
						<div className="Star w-6 h-6 px-0.5 py-[3px] flex-col justify-center items-center gap-2.5 inline-flex" />
						<div className="TagName text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-normal">
							4.2 — 54 Reviews
						</div>
					</div>
					<div className="Badge px-4 py-0.5 rounded-[100px] border border-gray-200 justify-start items-start gap-2 flex">
						<div className="TagName text-gray-600 text-xs font-medium font-['Inter'] capitalize leading-normal">
							IN STOCK
						</div>
					</div>
				</div>
				<div className="TitleShare w-[438px] left-0 top-[12px] absolute justify-between items-center inline-flex">
					<div className="RawBlackTShirtLineup text-center text-gray-900 text-2xl font-bold font-['Inter']">
						Raw Black T-Shirt Lineup
					</div>
					<div className="Share w-6 h-6 px-[3px] py-0.5 justify-center items-center gap-2.5 flex" />
				</div>
			</div>
			<div className="Image w-[534px] h-[574px] left-0 top-0 absolute bg-neutral-100 rounded-[5px]">
				<div className="Dots left-[239px] top-[534px] absolute justify-start items-start gap-2 inline-flex">
					<div className="Dot w-2 h-2 relative bg-gray-400 rounded-[100px]" />
					<div className="Dot w-2 h-2 relative bg-gray-400 rounded-[100px]" />
					<div className="Dot w-2 h-2 relative bg-gray-400 rounded-[100px]" />
					<div className="Dot w-2 h-2 relative bg-gray-900 rounded-[100px]" />
				</div>
				<img
					className="ProductImage w-72 h-[404px] left-[123px] top-[29px] absolute"
					src="https://via.placeholder.com/288x404"
				/>
			</div>
		</div>
	);
}

export default Detail;
