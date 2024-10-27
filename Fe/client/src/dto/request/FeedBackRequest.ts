import { z } from "zod";

export const feedBackRequest = z
	.object({
		feedback: z
			.string()
			.min(5, { message: "Nội dung có ít nhất 7 kí tự" })
			.max(200, { message: "Nội dung có nhiều nhất 200 kí tự" }),
	})
	.strict();