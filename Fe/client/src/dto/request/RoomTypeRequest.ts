import { z } from "zod";

export const roomTypeRequest = z
	.object({
		apartmentId: z
			.string()
			.min(36, { message: "Id căn hộ có ít nhất 5 kí tự" })
			.max(36, { message: "Id căn hộ có nhiều nhất 36 kí tự" }),
		info: z.string().max(500, { message: "Quy định có nhiều nhất 500 kí tự" }),
		description: z.string().max(500, { message: "Mô tả có nhiều nhất 500 kí tự" }),
		name: z.string().min(3, { message: "Tên có ít nhất 5 ký tự" }).max(100, { message: "Tên có nhiều nhất 100 kí tự" }),
		utility: z.string().max(500, { message: "Tiện ích có nhiều nhất 500 kí tự" }),
		maxOccupancy: z.number().int().min(1, { message: "Số người tối đa phải lớn hơn 0" }),
	})
	.strict();