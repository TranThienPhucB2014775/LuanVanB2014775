"use client";

import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Image, ChevronsUpDown, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import apartmentApiRequest from "@/apiRequests/apartment";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { result } from "@/dto/result";
import { RentalPostResponse } from "@/dto/response/rentalPost";
import { vietnamCities } from "@/constants/citiVietNam";
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogDescription,
	DialogFooter, DialogContent
} from "@/components/ui/dialog";
import Link from "next/link";
import { tenantPostResponse } from "@/dto/response/tenantPostResponse";
import tenantPost from "@/apiRequests/tenantPost";
import tenantPostApiRequest from "@/apiRequests/tenantPost";
import { undefined } from "zod";

const rentalTypes = [
	"Phòng trọ",
	"Căn hộ",
	"Nhà nguyên căn",
	"Chung cư mini",
	"Nhà mặt phố"
];

const tenantTypes = [
	{
		name: "Tìm phòng",
		value: "LOOKING_FOR_ROOM_TO_RENT"
	},
	{
		name: "Tìm người ở ghép",
		value: "LOOKING_FOR_ROOMMATE"
	},
	{
		name: "Nhượng phòng",
		value: "ROOM_SUBLET"
	}
];

export const tenantPostCreationRequest = z.object({
	city: z.string().min(1, { message: "Vui lòng chọn Tỉnh/Thành phố" }),
	district: z.string().min(1, { message: "Vui lòng chọn Quận/Huyện" }),
	address: z.string().min(1, { message: "Vui lòng nhập địa chỉ" }),
	ward: z.string().min(1, { message: "Vui lòng nhập Phường/Xã" }),
	title: z.string().min(1, { message: "Vui lòng nhập tiêu đề" }),
	description: z.string().min(1, { message: "Vui lòng nhập mô tả" }),
	tenantPostType: z.string().min(1, { message: "Vui lòng chọn loại người thuê" }),
	price: z.number().min(1, { message: "Vui lòng nhập giá thuê" })
});

export default function TenantPostForm({ tenantPostResponse }:
										   { tenantPostResponse?: tenantPostResponse }) {
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [formattedPrice, setFormattedPrice] = useState("");
	const [city, setCity] = useState("");

	const form = useForm<z.infer<typeof tenantPostCreationRequest>>({
		resolver: zodResolver(tenantPostCreationRequest),
		defaultValues: {
			city: tenantPostResponse?.city || "",
			district: tenantPostResponse?.district || "",
			address: tenantPostResponse?.address || "",
			ward: tenantPostResponse?.ward || "",
			title: tenantPostResponse?.title || "",
			description: tenantPostResponse?.description || "",
			tenantPostType: tenantPostResponse
				? tenantTypes.find(item => item.value === tenantPostResponse.tenantPostType)?.name
				: "",
			price: tenantPostResponse?.price || 0
		}
	});

	const { error, isFetching, fetch: create } = useFetch<ApiResponse<result<typeof tenantPostCreationRequest>>>(
		(data: {
			data: typeof tenantPostCreationRequest,
			sessionToken: string
		}) => tenantPostApiRequest.createTenantPost(data)
	);

	const {
		error: errorUpdate,
		isFetching: isFetchingUpdate8,
		fetch: update
	} = useFetch<ApiResponse<result<typeof tenantPostCreationRequest>>>(
		(data: {
			tenantPostId: string,
			data: typeof tenantPostCreationRequest,
			sessionToken: string
		}) => tenantPostApiRequest.updateTenantPost(data)
	);

	async function onSubmit(values: z.infer<typeof tenantPostCreationRequest>) {

		const tenantPostType = tenantTypes.find(item => item.name === values.tenantPostType)?.value;

		let res;

		tenantPostResponse
			? res = await update({
				tenantPostId: tenantPostResponse.tenantPostId,
				data: {
					city: values.city,
					district: values.district,
					address: values.address,
					ward: values.ward,
					title: values.title,
					description: values.description,
					tenantPostType: tenantPostType,
					price: values.price
				},
				sessionToken: localStorage.getItem("token") || ""
			})
			: res = await create({
				data: {
					city: values.city,
					district: values.district,
					address: values.address,
					ward: values.ward,
					title: values.title,
					description: values.description,
					tenantPostType: tenantPostType,
					price: values.price
				},
				sessionToken: localStorage.getItem("token") || ""
			});

		if (res?.code === 0) {
			toast({
				description: `${tenantPostResponse ? "Cập nhật" : "Đăng"} bài thành công`,
				title: "Thành công"
			});
			setShowConfirmDialog(true);
		} else {
			toast({
				description: "Đã có lỗi xảy ra",
				title: "Thất bại"
			});
		}
	}

	const handleContinue = () => {
		setShowConfirmDialog(false);
		form.reset();
	};

	const formatNumber = (value: string) => {
		// Remove non-digit characters
		const number = value.replace(/\D/g, "");
		// Format the number
		return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	return (
		<div className="min-h-screen w-full bg-background flex flex-col">
			<h1 className="text-center font-semibold text-2xl py-3">Thêm mới bài đăng</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Tỉnh/Thành phố</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant="outline" role="combobox"
														className="w-full justify-between">
													{field.value || "Chọn Tỉnh/Thành phố"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput placeholder="Tìm kiếm tỉnh/thành phố..." />
												<CommandList>
													<CommandEmpty>Không tìm thấy tỉnh/thành phố.</CommandEmpty>
													<CommandGroup>
														{vietnamCities.map((cityData) => (
															<CommandItem
																key={cityData.city}
																value={cityData.city}
																onSelect={(currentValue) => {
																	form.setValue("city", currentValue);
																	setCity(currentValue);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		city === cityData.city ? "opacity-100" : "opacity-0"
																	)}
																/>
																{cityData.city}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="district"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Quận/Huyện</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant="outline" role="combobox"
														className="w-full justify-between"
														disabled={!form.watch("city")}>
													{field.value || "Chọn Quận/Huyện"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput placeholder="Tìm kiếm quận/huyện..." />
												<CommandList>
													<CommandEmpty>Không tìm thấy quận/huyện.</CommandEmpty>
													<CommandGroup>
														{city && vietnamCities.find(item => item.city === city)?.districts.map((district) => (
															<CommandItem
																key={district}
																value={district}
																onSelect={(currentValue) => {
																	form.setValue("district", currentValue);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		form.watch("district") === district ? "opacity-100" : "opacity-0"
																	)}
																/>
																{district}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Địa chỉ</FormLabel>
									<FormControl>
										<Input placeholder="Địa chỉ" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="ward"
							render={({ field }) => (
								<FormItem >
									<FormLabel className="text-lg font-semibold">Phường/Xã</FormLabel>
									<FormControl>
										<Input placeholder="Phường, Xã" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="md:col-span-2">
									<FormLabel className="text-lg font-semibold">Tiêu đề</FormLabel>
									<FormControl>
										<Textarea placeholder="Cho thuê trọ ở Cái Răng, sinh viên" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="md:col-span-2">
									<FormLabel className="text-lg font-semibold">Mô tả</FormLabel>
									<FormControl>
										<Textarea placeholder="Cho thuê trọ sinh viên giá rẻ" {...field} rows={4} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tenantPostType"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Loại Bài viết</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant="outline" role="combobox"
														className="w-full justify-between">
													{field.value || "Chọn bài viết"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput placeholder="Tìm kiếm loại người thuê..." />
												<CommandList>
													<CommandEmpty>Không tìm thấy loại người thuê.</CommandEmpty>
													<CommandGroup>
														{tenantTypes.map((type) => (
															<CommandItem
																key={type.value}
																value={type.name}
																onSelect={(currentValue) => {
																	form.setValue("tenantPostType", currentValue);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		form.watch("tenantPostType") === type.name ? "opacity-100" : "opacity-0"
																	)}
																/>
																{type.name}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Giá thuê (VNĐ)</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="2.000.000"
											value={formattedPrice}
											onChange={(e) => {
												const formatted = formatNumber(e.target.value);
												setFormattedPrice(formatted);
												field.onChange(parseInt(formatted.replace(/\./g, ""), 10));
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" className="w-full text-lg py-6">
						{!tenantPostResponse ? "Đăng bài" : "Cập nhật"}
					</Button>
				</form>
			</Form>
			<Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{!tenantPostResponse ? "Đăng bài" : "Cập nhật"} thành công
						</DialogTitle>
						<DialogDescription>
							Bài đăng của bạn đã được tạo {!tenantPostResponse ? "đăng bài" : "cập nhật"} thành công. Bạn muốn làm gì tiếp theo?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Link href="./">
							<Button variant="outline">
								Quay lại
							</Button>
						</Link>
						<Button onClick={handleContinue}>
							Tiếp tục
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}