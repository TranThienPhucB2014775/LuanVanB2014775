import BreadCrumbItem from "@/components/BreadCrumb/BreadCrumbItem";
import ButtonCustom from "@/components/Button";
import React from "react";
import Link from "next/link";

function ErrorPage() {
	return (
		<>
			<div className="bg-Semantic-R100 w-full">
				<div className=" py-[20px] bg:py-[42px] px-[12px] max-w-ct-max-width mx-auto ">
					<div className="pb-[8px]">
						<p className="text-[24px] font-bold first-letter:uppercase">
							Error
						</p>
					</div>
					<BreadCrumbItem routeName="Error" />
				</div>
			</div>
			<div className="w-full h-[400px] ct-center">
				<div className="w-full lg:w-[500px] ct-center flex-col">
					{/*<img src={ }/>*/}
					<span className="text-[70px] font-bold text-Semantic-R100">
						Oops
					</span>
					<span className="text-[36px] font-bold text-Neutral-N900">
						Không Tìm Thấy Trang
					</span>
					<span className="text-[24px] text-Neutral-N500 text-center ">
						Trang bạn đang truy cập không thể tìm thấy, vui lòng thử
						lại sau vài phút
					</span>
					<ButtonCustom claesses="bg-Neutral-N800 w-[200px] mt-[48px]">
						<Link
							href="/"
							className="text-white px-[24px] py-[12px]"
						>
							Trở về trang chủ
						</Link>
					</ButtonCustom>
				</div>
			</div>
		</>
	);
}

export default ErrorPage;
