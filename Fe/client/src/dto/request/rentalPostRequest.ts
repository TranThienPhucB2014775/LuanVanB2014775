import * as z from "zod";

export const rentalPostUpdateRequest = z.object({
	city: z.string().min(1, { message: "Vui lòng chọn thành phố" }),
	district: z.string().min(1, { message: "Vui lòng chọn quận/huyện" }),
	ward: z.string().min(1, { message: "Vui lòng nhập phường/xã" }),
	address: z.string().min(1, { message: "Vui lòng nhập địa chỉ" }),
	title: z.string().min(1, { message: "Vui lòng nhập tiêu đề" }),
	description: z.string().min(1, { message: "Vui lòng nhập mô tả" }),
	amenities: z.string().min(1, { message: "Vui lòng nhập tiện nghi" }),
	area: z.number().min(1, { message: "Vui lòng nhập diện tích" }),
	price: z.number().min(1, { message: "Vui lòng nhập giá thuê" }),
	tenantType: z.string().min(1, { message: "Vui lòng chọn loại người thuê" }),
	rentalType: z.string().min(1, { message: "Vui lòng chọn loại cho thuê" })
});