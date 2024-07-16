import path from "path";
import { z } from "zod";

export const loginRequest = z
	.object({
		email: z
			.string()
			.min(5, { message: "Tên đăng nhập có ít nhất 6 kí tự" }),
		password: z
			.string()
			.min(5, { message: "Mật khẩu có ít nhất 6 kí tự" })
			.max(20),
	})
	.strict();
