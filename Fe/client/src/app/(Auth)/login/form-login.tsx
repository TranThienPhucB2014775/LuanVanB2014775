"use client";

import Link from "next/link";
import ButtonCustom from "@/components/Button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import authApiRequest from "@/apiRequests/auth";
import React from "react";
import { useFetch } from "@/useFetch";
import { useToast } from "@/components/ui/use-toast";
import { loginResponse } from "@/dto/response";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/app-provider";
import { isClient } from "@/lib/http";
import { loginRequest } from "@/dto/request";
import { ApiResponse } from "@/dto/ApiResponse";
import { INCORRECT_PASSWORD, USER_NOT_EXIST_CODE } from "@/lib";

export default function FormLogin() {
	const { error, isFetching, fetch } = useFetch<ApiResponse<loginResponse>>(
		(data: typeof loginRequest) => authApiRequest.login(data)
	);

	const { toast } = useToast();
	const router = useRouter();
	const { setUser } = useAppContext();

	const form = useForm<z.infer<typeof loginRequest>>({
		resolver: zodResolver(loginRequest),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof loginRequest>) {
		if (isFetching) return;
		else {
			const res = await fetch(values);
			if (res?.code === 0 && res.payload !== null) {
				if (isClient()) {
					await authApiRequest.auth({
						sessionToken: res.payload.result.token,
						expiresAt: res.payload.result.expiresAt,
					});
					localStorage.setItem("token", res.payload.result.token);
					const user = await authApiRequest.info(
						res.payload.result.token
					);
					setUser(values.email);
					router.push("/");
					router.refresh();
				}
			} else {
				const desc: string =
					res?.code === USER_NOT_EXIST_CODE
						? "Tài khoản không tồn tại"
						: res?.code == INCORRECT_PASSWORD
						? "Mật khẩu không chính xác"
						: "Lỗi không xác định khi đăng nhập, vui lòng thử lại sau vài phút";
				toast({
					variant: "destructive",
					title: "Đăng nhập không thành công",
					description: desc,
				});
			}
		}
	}

	// @ts-ignore
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Hãy nhập Email"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Hãy nhập Enail của bạn
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Hãy nhập mật khẩu của bạn"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Hãy nhập mật khẩu của bạn
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<p className="mt-[15px] text-[12px] leading-[2] text-Neutral-N500 capitalize flex justify-end">
					Quên mật khẩu?
				</p>
				<ButtonCustom claesses="mt-[15px] bg-Neutral-N900">
					<Button type="submit">
						<span className="text-white">
							{!isFetching ? "Đăng Nhập" : "Đang xử lý"}
						</span>
					</Button>
				</ButtonCustom>
				<div className="ct-center">
					<p className="mt-[15px] text-[14px] leading-[175%] text-Neutral-N500 capitalize font-normal">
						Bạn không có tài khoản?{" "}
						<Link href="/register" className="text-[16px]">
							Đăng kí
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
}
