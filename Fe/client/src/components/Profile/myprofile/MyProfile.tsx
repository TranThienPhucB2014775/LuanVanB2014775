"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProfileRequest } from "@/dto/request/updateProfileRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequest } from "@/dto/request/registerRequest";
import { useFetch } from "@/useFetch";
import { authApiRequest } from "@/apiRequests";
import { useAppContext } from "@/app/app-provider";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonCustom from "@/components/Button";
import MyProfileAvatar from "@/components/Profile/myprofile/MyProfileAvatar";
import { infoResponse } from "@/dto/response";
import { ApiResponse } from "@/dto/ApiResponse";

const MyProfile = ({
	infoResponse,
}: {
	infoResponse: infoResponse | undefined;
}) => {
	const form = useForm<z.infer<typeof updateProfileRequest>>({
		resolver: zodResolver(registerRequest),
		defaultValues: {
			username: "",
			city: "",
			address: "",
		},
	});

	const [info, setInfo] = useState({
		email: "",
		imgAvatar: "",
	});
	useEffect(() => {
		if (!infoResponse) return;
		// form.setValue("username", infoResponse.result.username);
		form.setValue("city", infoResponse.result.city);
		form.setValue("address", infoResponse.result.address);
		setInfo({
			email: infoResponse.result.email,
			imgAvatar: infoResponse.result.imgAvatar,
		});
	}, []);

	function onSubmit(values: z.infer<typeof updateProfileRequest>) {
		console.log(values);
	}

	return (
		<div className="w-[500px]">
			<Form {...form}>
				<MyProfileAvatar urlImage={info.imgAvatar} />
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-5 mt-[30px]"
				>
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input readOnly value={info.email} />
						</FormControl>
						<FormMessage />
					</FormItem>

					<FormItem>
						<FormLabel>Số Điện Thoại</FormLabel>
						<FormControl>
							<Input placeholder="Hãy nhập số điện thoại của bạn" />
						</FormControl>
						<FormMessage />
					</FormItem>

					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên hiển thị</FormLabel>
								<FormControl>
									<Input
										placeholder="Hãy nhập tên hiển thị của bạn"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="inline-block">
								<FormLabel>Thành phố, Tỉnh thành</FormLabel>
								<FormControl>
									<Input
										placeholder="Hãy nhập thành phố của bạn"
										{...field}
										readOnly
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Địa chỉ</FormLabel>
								<FormControl>
									<Input
										placeholder="Hãy nhập thành phố của bạn"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<button className="w-[124px]" type="submit">
						<ButtonCustom claesses="bg-Neutral-N900">
							<span className="text-white capitalize">Lưu</span>
						</ButtonCustom>
					</button>
				</form>
			</Form>
		</div>
	);
};

export default MyProfile;
