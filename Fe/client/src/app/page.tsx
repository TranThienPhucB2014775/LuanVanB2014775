"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import PageAnimate from "@/components/PageAnimate";
import AnimatedSection from "@/components/AnimatedSection";
import { features } from "@/constants/features";

const testimonialsData = {
	title: "Những gì người dùng của chúng tôi nói về RentManage",
	description:
		"Đừng chỉ nghe chúng tôi nói – hãy lắng nghe từ những người dùng hài lòng của chúng tôi! Xem những gì người khác đang nói về RentManage và cách mà ứng dụng đã giúp họ tìm kiếm và quản lý các bất động sản cho thuê.",
	testimonials: [
		{
			name: "Nguyễn Văn An",
			designation: "Quản lý tài sản",
			content:
				"RentManage đã thay đổi hoàn toàn cách tôi quản lý tài sản cho thuê. Giao diện dễ sử dụng và các tính năng tìm kiếm mạnh mẽ đã làm cho việc quản lý các danh sách và tương tác với người thuê trở nên dễ dàng hơn."
		},
		{
			name: "Trần Thị Mai",
			designation: "Người thuê nhà",
			content:
				"Với tư cách là người thuê nhà, tôi thấy RentManage cực kỳ hữu ích trong việc tìm kiếm và nộp đơn cho các tài sản cho thuê. Các bộ lọc và danh sách chi tiết của nền tảng đã giúp tôi tìm ngôi nhà lý tưởng của mình dễ dàng hơn nhiều."
		},
		{
			name: "Lê Văn Hùng",
			designation: "Chủ nhà",
			content:
				"Quản lý các tài sản cho thuê của tôi chưa bao giờ dễ dàng hơn nhờ vào RentManage. Các công cụ theo dõi và giao tiếp của hệ thống giúp tôi duy trì tổ chức và phản hồi nhanh chóng các yêu cầu của người thuê."
		}
	]
};

export default function Home() {
	return (
		<PageAnimate>
			<HeroSection />
			<TestimonialsSection />
			<FeaturesSection />
		</PageAnimate>
	);
}

function HeroSection() {
	return (
		<section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-22">
			<AnimatedSection>
				<div className="container mx-auto px-4 text-center">
					<Link
						href=""
						className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 mb-8"
						target="_blank"
					>
						Theo dõi chúng tôi trên Mạng xã hội
					</Link>
					<h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl mb-6">
						Giải pháp tối ưu để tìm kiếm và quản lý nhà trọ
					</h1>
					<p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8">
						Ứng dụng của chúng tôi cung cấp tất cả các công cụ cần thiết để bạn có thể dễ dàng tìm kiếm nhà
						trọ phù hợp và quản lý thông tin thuê trọ một cách hiệu quả.
					</p>
					<div className="space-x-4">
						<Button asChild size="lg">
							<Link href="/login">Bắt đầu ngay</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/contact">Liên hệ</Link>
						</Button>
					</div>
				</div>
			</AnimatedSection>
		</section>
	);
}

function TestimonialsSection() {
	return (
		<section className="bg-gray-100 dark:bg-gray-800 py-20">
			<div className="container mx-auto px-4">
				<AnimatedSection>
					<h2 className="text-3xl font-bold text-center mb-4 sm:text-4xl lg:text-5xl">
						{testimonialsData.title}
					</h2>
					<p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
						{testimonialsData.description}
					</p>
				</AnimatedSection>
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{testimonialsData.testimonials.map((item, index) => (
						<AnimatedSection key={index}>
							<div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
								<div className="flex items-center mb-4">
									<UserCircleIcon className="w-12 h-12 text-blue-500" />
									<div className="ml-4">
										<h3 className="text-xl font-semibold">{item.name}</h3>
										<p className="text-gray-500 dark:text-gray-400">{item.designation}</p>
									</div>
								</div>
								<blockquote className="text-gray-700 dark:text-gray-300 italic">"{item.content}"
								</blockquote>
							</div>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}

function FeaturesSection() {
	return (
		<section className="py-20 bg-white dark:bg-gray-900">
			<div className="container mx-auto px-4">
				<AnimatedSection>
					<h2 className="text-3xl font-bold text-center mb-4 sm:text-4xl lg:text-5xl">
						Everything you need to start a website
					</h2>
					<p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
						Astro comes batteries included. It takes the best parts of state-of-the-art tools and adds its
						own innovations.
					</p>
				</AnimatedSection>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((item) => (
						<AnimatedSection key={item.title}>
							<div className="flex items-start">
								<div className="flex-shrink-0 mt-1 bg-blue-500 rounded-full p-2 w-10 h-10">
									<CheckIcon className="w-6 h-6 text-white" />
								</div>
								<div className="ml-4">
									<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
									<p className="text-gray-600 dark:text-gray-300">{item.description}</p>
								</div>
							</div>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}