import path from "path";
import { z } from "zod";

export const contactRequest = z
	.object({
		fullName: z.string().min(3).max(255),
		email: z.string().email(),
		message: z.string().min(3).max(255),
	})
	.strict();
