"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CitySelect from "@/components/rentalPost/form/CitySelect";
import DistrictSelect from "@/components/rentalPost/form/DistrictSelect";
import FormFieldComponent from "@/components/rentalPost/form/FormFieldComponent";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { vietnamCities } from "@/constants/citiVietNam";
import { RentalPostResponse } from "@/dto/response/rentalPost";
import RentalPostFormImage from "@/components/manage-rental-post/ManageRentalPostFormImage";
import { rentalPostUpdateRequest } from "@/dto/request/rentalPostRequest";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const cities = [
	{ city: "Hà Nội", districts: ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa", "Tây Hồ"] },
	{ city: "Hồ Chí Minh", districts: ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5"] },
	{ city: "Đà Nẵng", districts: ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu"] }
];

export default function RentalPostForm({ rentalPost }: { rentalPost: RentalPostResponse | undefined }) {
	const [city, setCity] = useState(rentalPost?.city || "");

	const form = useForm<z.infer<typeof rentalPostUpdateRequest>>({
		resolver: zodResolver(rentalPostUpdateRequest),
		defaultValues: {
			city: rentalPost?.city || "",
			district: rentalPost?.district || "",
			ward: rentalPost?.ward || "",
			address: rentalPost?.address || "",
			title: rentalPost?.title || "",
			description: rentalPost?.description || "",
			amenities: rentalPost?.amenities || "",
			area: rentalPost?.area || 1,
			price: rentalPost?.price || 1,
			tenantType: rentalPost?.tenantType || "",
			rentalType: rentalPost?.rentalType || ""
		}
	});

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<RentalPostResponse>>>(
		(data: {
			rentalPostId: string,
			data: typeof rentalPostUpdateRequest,
			sessionToken: string
		}) => rentalPostApiRequest.updateRentalPost(data)
	);

	const { toast } = useToast();

	async function onSubmit(values: z.infer<typeof rentalPostUpdateRequest>) {
		console.log(values);
		const res = await fetch(
			{
				rentalPostId: rentalPost?.rentalPostId || "",
				data: values,
				sessionToken: localStorage.getItem("token") || ""
			}
		);

		if (res?.code === 0) {
			toast({
				title: "Thành công",
				description: "Cập nhật thông tin bài đăng cho thuê thành công"
			});
		} else {
			toast({
				title: "Thất bại",
				description: "Cập nhật thông tin bài đăng cho thuê thất bại",
				variant: "destructive"
			});
		}


	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<header className="sticky top-0 z-10 bg-background border-b">
				<div className="container mx-auto px-4 py-4">
					<h1 className="text-2xl font-bold">Cập nhật thông tin cho thuê</h1>
				</div>
			</header>
			<ScrollArea className="flex-grow">
				<div className="container mx-auto px-4 py-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<Card>
								<CardHeader>
									<CardTitle>Thông tin cơ bản</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
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
																<ChevronsUpDown
																	className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-full p-0">
														<Command>
															<CommandInput placeholder="Tìm kiếm tỉnh/thành phố..." />
															<CommandList>
																<CommandEmpty>Không tìm thấy tỉnh/thành
																	phố.</CommandEmpty>
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
																<ChevronsUpDown
																	className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Chi tiết cho thuê</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mô tả</FormLabel>
												<FormControl>
													<Input placeholder="Nhập mô tả" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="amenities"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tiện nghi</FormLabel>
												<FormControl>
													<Input placeholder="Nhập tiện nghi" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="area"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Diện tích (m²)</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Nhập diện tích"
															{...field}
															onChange={(e) => {
																form.setValue("area", parseInt(e.target.value));
															}}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Giá thuê</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Nhập giá thuê"
															{...field}
															onChange={(e) => {
																form.setValue("price", parseInt(e.target.value));
															}}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="rentalType"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Loại cho thuê</FormLabel>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button variant="outline" role="combobox"
																		className="w-full justify-between">
																	{field.value || "Chọn loại cho thuê"}
																	<ChevronsUpDown
																		className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className="w-full p-0">
															<Command>
																<CommandInput placeholder="Tìm kiếm loại cho thuê..." />
																<CommandList>
																	<CommandEmpty>Không tìm thấy loại cho
																		thuê.</CommandEmpty>
																	<CommandGroup>
																		{rentalTypes.map((type) => (
																			<CommandItem
																				key={type}
																				value={type}
																				onSelect={(currentValue) => {
																					form.setValue("rentalType", currentValue);
																				}}
																			>
																				<Check
																					className={cn(
																						"mr-2 h-4 w-4",
																						form.watch("rentalType") === type ? "opacity-100" : "opacity-0"
																					)}
																				/>
																				{type}
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
											name="tenantType"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Loại người
														thuê</FormLabel>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button variant="outline" role="combobox"
																		className="w-full justify-between">
																	{field.value || "Chọn loại người thuê"}
																	<ChevronsUpDown
																		className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className="w-full p-0">
															<Command>
																<CommandInput
																	placeholder="Tìm kiếm loại người thuê..." />
																<CommandList>
																	<CommandEmpty>Không tìm thấy loại người
																		thuê.</CommandEmpty>
																	<CommandGroup>
																		{tenantTypes.map((type) => (
																			<CommandItem
																				key={type}
																				value={type}
																				onSelect={(currentValue) => {
																					form.setValue("tenantType", currentValue);
																				}}
																			>
																				<Check
																					className={cn(
																						"mr-2 h-4 w-4",
																						form.watch("tenantType") === type ? "opacity-100" : "opacity-0"
																					)}
																				/>
																				{type}
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
									</div>
								</CardContent>
							</Card>

							<CardFooter className="flex justify-end">
								<Button type="submit">Lưu thay đổi thông tin</Button>
							</CardFooter>
						</form>
					</Form>
				</div>
			</ScrollArea>
		</div>
	);
}

const rentalTypes = [
	"Phòng trọ",
	"Căn hộ",
	"Nhà nguyên căn",
	"Chung cư mini",
	"Nhà mặt phố"
];

const tenantTypes = [
	"Tất cả",
	"Sinh viên",
	"Người đi làm",
	"Gia đình",
	"Người nước ngoài"
];