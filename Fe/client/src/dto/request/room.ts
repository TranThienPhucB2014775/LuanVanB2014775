import { z } from "zod";

export const roomRequest = z
	.object({
		roomTypeId: z.string(),
		name: z.string()
			.min(1, { message: "Tên phòng có ít nhất 1 kí tự" })
			.max(100, { message: "Tên phòng  có nhiều nhất 100 kí tự" })
	})
	.strict();