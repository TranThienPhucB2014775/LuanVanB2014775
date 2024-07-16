import {z} from "zod";

export const city: string = "Cần Thơ";

export const updateProfileRequest = z
    .object({
        username: z
            .string()
            .min(6, {message: "Tên hiển thị phải ít nhất 6 ký tự"}),
        city: z.string(),
        address: z.string().min(10, {message: "Vui lòng nhập địa chỉ hợp lệ"}),
    })
    .strict()
    .superRefine(({...data}, ctx) => {
        if (data.city !== city)
            console.log(data.city),
                ctx.addIssue({
                    code: "custom",
                    message: "Chỉ chấp nhận thành phố Cần Thơ",
                    path: ["city"],
                });

        return data;
    });
