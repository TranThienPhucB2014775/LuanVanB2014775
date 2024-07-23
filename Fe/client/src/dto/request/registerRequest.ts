import path from "path";
import { z } from "zod";

export const city: string = "Cần Thơ";

export const registerRequest = z
	.object({
		email: z.string().email("Vui lòng nhâp email hợp lệ"),
		userName: z
			.string()
			.min(6, { message: "Tên hiển thị phải ít nhất 6 ký tự" }),
		password: z
			.string()
			.min(6, { message: "Mật khẩu có ít nhất 6 kí tự" })
			.max(20),
		confirmPassword: z
			.string()
			.min(6, { message: "Mật khẩu có ít nhất 6 kí tự" })
			.max(20),
		city: z.string().optional(),
		address: z.string().optional(),
	})
	.strict()
	.superRefine(({ ...data }, ctx) => {
		if (data.password !== data.confirmPassword)
			ctx.addIssue({
				code: "custom",
				message: "Mật khẩu không khớp",
				path: ["password", "confirmPassword"],
			});

		return data;
	});
