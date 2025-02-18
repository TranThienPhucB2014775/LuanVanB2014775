export type infoResponse = {
	result: {
		id: string;
		email: string;
		username: string;
		city: string;
		address: string;
		enable: boolean;
		createdDate: string;
		imgAvatar: string;
		phoneNumber: string;
		role: string;
		aboutMe: string;
		isVerified: boolean;
		facebook: string;
		zaloPhoneNumber: string
	};
};

import * as z from "zod";

export const editProfileSchema = z.object({
	userName: z.string().min(2, "Tên người dùng phải có ít nhất 2 ký tự"),
	city: z.string().min(2, "Thành phố phải có ít nhất 2 ký tự"),
	address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
	phoneNumber: z.string().regex(/^\d{10}$/, "Số điện thoại phải có 10 chữ số").nullable().optional(),
	aboutMe: z.string().max(500, "Giới thiệu bản thân phải ít hơn 500 ký tự").nullable().optional(),
	facebook: z.string().url("URL Facebook không hợp lệ").optional().nullable().or(z.literal("")),
	zaloPhoneNumber: z.string().regex(/^\d{10}$/, "Số điện thoại Zalo phải có 10 chữ số").optional().nullable().or(z.literal(""))
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;



