import React from "react";
import ContactForm from "@/components/contact/contactForm";
import { UserIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/16/solid"; // Hoặc '@heroicons/react/outline'

export default function Page() {
	return (
		<div className="max-w-ct-max-width my-[32px] w-full mx-auto">
			{/* <Sectionhead>
				<Fragment slot="title">Contact</Fragment>
				<Fragment slot="desc">We are a here to help.</Fragment>
			</Sectionhead> */}

			<div className="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
				<div>
					<h2 className="font-medium text-2xl text-gray-800">
						Liên hệ với chung tôi
					</h2>
					<p className="text-lg leading-relaxed text-slate-500 mt-3">
						Bạn có điều gì cần chia sẻ? Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy điền vào biểu mẫu, gửi email hoặc gọi điện thoại cho chúng tôi.
					</p>
					<div className="mt-5">
						<div className="flex items-center mt-2 space-x-2 text-gray-600">
							<MapPinIcon className="text-gray-400 w-5 h-5" />
							<span>342 Tên Lửa, P. Bình Trị Đông B, Q. Bình Tân, TP. Hồ Chí Minh</span>
						</div>
						<div className="flex items-center mt-2 space-x-2 text-gray-600">
							<UserIcon className="text-gray-400 w-5 h-5" />

							<a href="mailto:hello@astroshipstarter.com">
								phuctt.dev@gmail.com
							</a>
						</div>
						<div className="flex items-center mt-2 space-x-2 text-gray-600">
							<PhoneIcon className="text-gray-400 w-5 h-5" />
							<a href="tel:+1 (987) 4587 899">
								+84 767 480 732
							</a>
						</div>
					</div>
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
		</div>
	);
}
