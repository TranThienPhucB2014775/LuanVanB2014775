import Image from "next/image";
import React from "react";
import PageAnimate from "@/components/PageAnimate";

import banner from "@/assets/images/banner.png";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CheckIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { features } from "@/constants/features";

const testimonialsData = {
	enable: true,
	title: "Những gì người dùng của chúng tôi nói về RentManage",
	description:
		"Đừng chỉ nghe chúng tôi nói – hãy lắng nghe từ những người dùng hài lòng của chúng tôi! Xem những gì người khác đang nói về RentManage và cách mà ứng dụng đã giúp họ tìm kiếm và quản lý các bất động sản cho thuê.",
	testimonials: [
		{
			name: "Nguyễn Văn An",
			designation: "Quản lý tài sản",
			content:
				"RentManage đã thay đổi hoàn toàn cách tôi quản lý tài sản cho thuê. Giao diện dễ sử dụng và các tính năng tìm kiếm mạnh mẽ đã làm cho việc quản lý các danh sách và tương tác với người thuê trở nên dễ dàng hơn.",
		},
		{
			name: "Trần Thị Mai",
			designation: "Người thuê nhà",
			content:
				"Với tư cách là người thuê nhà, tôi thấy RentManage cực kỳ hữu ích trong việc tìm kiếm và nộp đơn cho các tài sản cho thuê. Các bộ lọc và danh sách chi tiết của nền tảng đã giúp tôi tìm ngôi nhà lý tưởng của mình dễ dàng hơn nhiều.",
		},
		{
			name: "Lê Văn Hùng",
			designation: "Chủ nhà",
			content:
				"Quản lý các tài sản cho thuê của tôi chưa bao giờ dễ dàng hơn nhờ vào RentManage. Các công cụ theo dõi và giao tiếp của hệ thống giúp tôi duy trì tổ chức và phản hồi nhanh chóng các yêu cầu của người thuê.",
		},
	],
};

export default function Home() {
	return (
		<PageAnimate>
			<div className="container g:my-[64px]">
				{/* <div className="flex flex-col lg:flex-row gap-[36px]">
					<section className="section ">
						<div className="row justify-center">
							<div className="lg:col-7 md:col-9 mb-8 text-center">
								<h1 className="mb-4 text-h3-sm lg:text-4xl lg:font-bold lg:px-72">
									Giải pháp tối ưu để tìm kiếm và quản lý nhà
									trọ
								</h1>
								<p className="mb-8 px-60">
									Ứng dụng của chúng tôi cung cấp tất cả các
									công cụ cần thiết để bạn có thể dễ dàng tìm
									kiếm nhà trọ phù hợp và quản lý thông tin
									thuê trọ một cách hiệu quả.
								</p>
								<Link href="/login">
									<Button className="mt-1">
										Bắt đầu ngay
									</Button>
								</Link>
							</div>

							<div className="col-12 flex justify-center">
								<Image
									src={banner}
									height={380}
									width={1200}
									alt="banner"
								/>
							</div>
						</div>
					</section>
				</div> */}
				<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-28 px-20">
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
						<Link
							href=""
							className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium "
							target="_blank"
						>
							Theo dõi chúng tôi trêb Facebook
						</Link>
						<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl lg:font-bold">
							Giải pháp tối ưu để tìm kiếm và quản lý nhà trọ
						</h1>
						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							Ứng dụng của chúng tôi cung cấp tất cả các công cụ
							cần thiết để bạn có thể dễ dàng tìm kiếm nhà trọ phù
							hợp và quản lý thông tin thuê trọ một cách hiệu quả.
						</p>
						<div className="space-x-4">
							<Link href="/login">
								<Button className="mt-1">Bắt đầu ngay</Button>
							</Link>
							<Link href="/login">
								<Button variant="outline" className="mt-1">
									Liên hệ
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</div>
			<section className="py-12 px-4 bg-gray-100 dark:bg-gray-800">
				<div className="container mx-auto text-center">
					<h2 className="text-5xl font-bold mb-4 lg:mx-72">
						{testimonialsData.title}
					</h2>
					<p className="text-lg mb-8 lg:mx-44">
						{testimonialsData.description}
					</p>
					<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{testimonialsData.testimonials.map((item, index) => (
							<div
								key={index}
								className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
							>
								<div className="flex items-center mb-4">
									<UserCircleIcon className="w-12 h-12" />
									<div className="ml-4">
										<h3 className="text-xl font-semibold">
											{item.name}
										</h3>
										<p className="text-gray-500 dark:text-gray-400">
											{item.designation}
										</p>
									</div>
								</div>
								<blockquote className="text-gray-700 dark:text-gray-300 text-left">
									{item.content}
								</blockquote>
							</div>
						))}
					</div>
				</div>
			</section>
			<div className="container pt-8">
				<div className="mt-16 md:mt-0 text-center">
					<h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
						Everything you need to start a website
					</h2>
					<p className="text-lg mt-4 text-slate-600">
						Astro comes batteries included. It takes the best parts
						of state-of-the-art tools and adds its own innovations.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
					{features.map((item) => (
						<div className="flex gap-4 items-start">
							<div className="mt-1 bg-black rounded-full  p-2 w-8 h-8 shrink-0">
								{/* {item.icon()} */}
								<CheckIcon
									style={{ color: "white" }}
									className="w-4"
								/>
							</div>
							<div>
								<h3 className="font-semibold text-lg">
									{item.title}
								</h3>{" "}
								<p className="text-slate-500 mt-2 leading-relaxed">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</PageAnimate>
	);
}
