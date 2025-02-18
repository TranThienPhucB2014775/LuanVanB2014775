import { z } from "zod";

export const apartmentRequest = z
	.object({
		city: z
			.string()
			.min(5, { message: "Vui lòng chọn thành phố" }),
		address: z
			.string()
			.min(10, { message: "Địa chỉ có ít nhất 10 kí tự" })
			.max(100, { message: "Địa chỉ có nhiều nhất 100 6 kí tự" }),
		rule: z.string().max(500, { message: "Quy định có nhiều nhất 500 kí tự" }),
		description: z.string().max(500, { message: "Mô tả có nhiều nhất 500 kí tự" }),
		name: z.string().min(5, { message: "Tên có ít nhất 5 ký tự" }).max(100, { message: "Tên có nhiều nhất 100 kí tự" }),
		utility: z.string().max(500, { message: "Tiện ích có nhiều nhất 500 kí tự" }),
		apartmentType: z.string().min(1, { message: "Hãy chọn loại phòng trọ" }),
	})
	.strict();