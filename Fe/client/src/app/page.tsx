import Image from "next/image";
import ShieldCheck from "@/assets/icons/Shield Check.png";
import StarBadge from "@/assets/icons/Star Badge.png";
import React from "react";
import PageAnimate from "@/components/PageAnimate";
import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";

export default function Home() {
	return (
		<PageAnimate>
			<div className="mx-auto max-w-ct-max-width px-[12px]">
				<div className="w-full pb-12 items-center inline-flex lg:flex-row flex-col justify-between ml-[15px] lg:ml-0">
					<div className="lg:w-[328px] h-[218px] w-full">
						<div className="w-12 h-12 px-[5px] bg-Neutral-w100 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
							<Image
								className="w-6 h-6 p-px flex-col justify-center items-center gap-2.5 inline-flex"
								src={ShieldCheck}
								alt={"ShieldCheck"}
								height={"24"}
								width={"24"}
							/>
						</div>
						<div className=" text-Neutral-N800 text-base font-semibold font-['Inter'] mt-[24px]">
							Free Shipping
						</div>
						<div className="w-full text-Neutral-N500 text-sm font-normal font-['Inter'] leading-normal mt-[12px]">
							Upgrade your style today and get FREE shipping on
							all orders! Don't miss out.
						</div>
					</div>
					<div className="lg:w-[328px] h-[218px] w-full">
						<div className="w-12 h-12 px-[5px] bg-Neutral-w100 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
							<Image
								className="w-6 h-6 p-px flex-col justify-center items-center gap-2.5 inline-flex"
								src={ShieldCheck}
								alt={"ShieldCheck"}
								height={"24"}
								width={"24"}
							/>
						</div>
						<div className=" text-Neutral-N800 text-base font-semibold font-['Inter'] mt-[24px]">
							Free Shipping
						</div>
						<div className="w-full  text-Neutral-N500 text-sm font-normal font-['Inter'] leading-normal mt-[12px]">
							Upgrade your style today and get FREE shipping on
							all orders! Don't miss out.
						</div>
					</div>
					<div className="lg:w-[328px] h-[218px] w-full">
						<div className="w-12 h-12 px-[5px] bg-Neutral-w100 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
							<Image
								className="w-6 h-6 p-px flex-col justify-center items-center gap-2.5 inline-flex"
								src={StarBadge}
								alt="StarBadge"
								height={"24"}
								width={"24"}
							/>
						</div>
						<div className=" text-Neutral-N800 text-base font-semibold font-['Inter'] mt-[24px]">
							Free Shipping
						</div>
						<div className="w-full  text-Neutral-N500 text-sm font-normal font-['Inter'] leading-normal mt-[12px]">
							Upgrade your style today and get FREE shipping on
							all orders! Don't miss out.
						</div>
					</div>
				</div>
			</div>
		</PageAnimate>
	);
}
