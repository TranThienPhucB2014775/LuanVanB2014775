import React from "react";
import {
	BuildingOfficeIcon,
	MagnifyingGlassIcon,
	CalendarIcon,
	CurrencyDollarIcon,
	ChatBubbleOvalLeftIcon,
	CogIcon,
} from "@heroicons/react/16/solid";

interface Feature {
	title: string;
	description: string;
	icon: () => React.ReactElement; // Change to a function () = that returns React.ReactElement// Change to a function type that returns React.ReactElement
}

export const features = [
	{
		title: "Đăng Tin Cho Thuê",
		description:
			"Dễ dàng đăng tin cho thuê nhà với mô tả chi tiết, hình ảnh và giá cả để thu hút người thuê tiềm năng.",
		// icon: () => <BuildingOfficeIcon className="w-12 h-12" />,
	},
	{
		title: "Bộ Lọc Tìm Kiếm Nâng Cao",
		description:
			"Người thuê có thể sử dụng các bộ lọc tìm kiếm nâng cao để tìm nhà cho thuê phù hợp dựa trên vị trí, giá cả, tiện nghi, và nhiều tiêu chí khác.",
		// icon: () => <MagnifyingGlassIcon className="w-12 h-12" />,
	},
	{
		title: "Cập Nhật Tình Trạng Nhà Cho Thuê",
		description:
			"Giữ cho danh sách nhà cho thuê của bạn luôn được cập nhật với tình trạng hiện tại, đảm bảo người thuê nhìn thấy các lựa chọn mới nhất.",
		// icon: () => <CalendarIcon className="w-12 h-12" />,
	},
	{
		title: "Hệ Thống Thanh Toán Tích Hợp",
		description:
			"Hỗ trợ thanh toán tiền thuê nhà an toàn và dễ dàng trực tiếp qua nền tảng của chúng tôi, giúp giao dịch trở nên đơn giản cho cả chủ nhà và người thuê.",
		// icon: () => <CurrencyDollarIcon className="w-12 h-12" />,
	},
	{
		title: "Đánh Giá Chủ Nhà và Người Thuê",
		description:
			"Xây dựng sự tin tưởng trong cộng đồng với hệ thống đánh giá chủ nhà và người thuê chi tiết.",
		// icon: () => <ChatBubbleOvalLeftIcon className="w-12 h-12" />,
	},
	// Add more features as needed
];
