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
import { z } from "zod";
import { registerRequest } from "@/dto/request/registerRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { authApiRequest } from "@/apiRequests";
import { registerResponse } from "@/dto/response";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function FormRegister() {
	const form = useForm<z.infer<typeof registerRequest>>({
		resolver: zodResolver(registerRequest),
		defaultValues: {
			email: "",
			userName: "",
			password: "",
			confirmPassword: "",
			city: "",
			address: "",
		},
	});

	const { error, isFetching, fetch } = useFetch<
		ApiResponse<registerResponse>
	>((data: typeof registerRequest) => authApiRequest.register(data));

	const { toast } = useToast();
	const router = useRouter();

	async function onSubmit(values: z.infer<typeof registerRequest>) {
		const res = await fetch(values);
		console.log(res?.code);
		if (res?.code === 0) {
			toast({
				variant: "destructive",
				title: "Tạo tài khoản thành công",
				// description: desc,
			});
			router.push("/login");
		} else if (res?.error != null) {
			const desc: string =
				res?.code === 404
					? "Tài khoản không tồn tại"
					: res?.code == 401
					? "Mật khẩu không chính xác"
					: "Lỗi không xác định khi đăng nhập, vui lòng thử lại sau vài phút";
			toast({
				variant: "destructive",
				title: "Đăng nhập không thành công",
				description: desc,
			});
		}
	}

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
									placeholder="Hãy nhập email của bạn để tạo tài khoản"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Hãy nhập email của bạn để tạo tài khoản
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên hiển thị</FormLabel>
							<FormControl>
								<Input
									placeholder="Hãy nhập tên hiển thị của bạn"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Hãy nhập tên hiển thị của bạn
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
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nhập lại mật khẩu</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder=" Hãy nhập lại mật khẩu của bạn"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Hãy nhập lại mật khẩu của bạn
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thành phố, Tỉnh thành</FormLabel>
							<FormControl>
								<Input
									placeholder="Hãy nhập thành phố của bạn"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Hãy nhập thành phố của bạn
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thành phố, Tỉnh thành</FormLabel>
							<FormControl>
								<Input
									placeholder="Hãy nhập địa chỉ của bạn"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Hãy nhập thành phố của bạn
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<button className="w-full" type="submit">
					<ButtonCustom claesses="bg-Neutral-N900">
						<span className="text-white capitalize">
							Tạo Tài Khoản
						</span>
					</ButtonCustom>
				</button>
				<div className="ct-center">
					<p className="text-[14px] leading-[175%] text-Neutral-N500 capitalize font-normal">
						Bạn đã có tài khoản?{" "}
						<Link href="/login" className="text-[16px]">
							Đăng nhập
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
}
