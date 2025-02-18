import { z } from "zod";

export const InviteCreationRequest = z.object(
	{
		email: z.string(),
		userId: z.string(),
		message: z.string().min(5, "Tin nhắn phải có ít nhất 5 ký tự"),
		startDate: z.date(),
		endDate: z.date(),
		price: z.number().min(0, "Giá phải lớn hơn 0"),
		depositAmount: z.number().min(0, "Số tiền đặt cọc phải lớn hơn 0")
	}
).strict()
	.refine(data => {
		const emailProvided = data.email !== "";
		const userIdProvided = data.userId !== "";

		return (emailProvided && !userIdProvided) || (!emailProvided && userIdProvided);
	}, {
		message: "Phải cung cấp email hoặc userId, nhưng không được cả hai.",
		path: ["email"]
	})
	.refine(data => {

		if (data.userId !== "") {
			if (data.userId.length !== 36) {
				return false;
			}
		}
		return true;

	}, {
		message: "UserId không hợp lệ",
		path: ["userId"]
	}).refine(data => {

		if (data.email !== "") {
			if (!data.email.includes("@")) {
				return false;
			}
		}
		return true;
	}, {
		message: "Email không hợp lệ",
		path: ["email"]
	});
