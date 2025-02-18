import React from "react";
import ChevronRight from "@/assets/icons/Chevron Right.png";
import Link from "next/link";
import Image from "next/image";

function BreadCrumbItem({ routeName, value }: { routeName: string, value: string }) {
	return (
		<div className="flex flex-row gap-[12px] items-center">
                    <span className="text-Neutral-N500">
                        <Link href="/">Trang chủ</Link>
                    </span>
			<Image
				src={ChevronRight}
				alt={"ChevronRight"}
				className="w-[24px] h-[24px] p-6px]"
				height={24}
				width={24}
			/>
			<Link href={`${value}`}>
				<span
					className="text-[14px] leading-[170%] text-Neutral-N900 first-letter:uppercase">{routeName}
				</span>
			</Link>
		</div>
	);
}

export default BreadCrumbItem;