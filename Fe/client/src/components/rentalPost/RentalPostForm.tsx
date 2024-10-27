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

const formSchema = z.object({
	city: z.string().min(1, { message: "Vui lòng chọn Tỉnh/Thành phố" }),
	district: z.string().min(1, { message: "Vui lòng chọn Quận/Huyện" }),
	address: z.string().min(1, { message: "Vui lòng nhập địa chỉ" }),
	ward: z.string().min(1, { message: "Vui lòng nhập Phường/Xã" }),
	title: z.string().min(1, { message: "Vui lòng nhập tiêu đề" }),
	description: z.string().min(1, { message: "Vui lòng nhập mô tả" }),
	amenities: z.string().min(1, { message: "Vui lòng nhập tiện nghi" }),
	area: z.number().min(1, { message: "Vui lòng nhập diện tích" }),
	tenantType: z.string().min(1, { message: "Vui lòng chọn loại người thuê" }),
	price: z.number().min(1, { message: "Vui lòng nhập giá thuê" }),
	rentalType: z.string().min(1, { message: "Vui lòng chọn loại cho thuê" })
});

export default function RentalPostForm() {
	const [images, setImages] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [formattedPrice, setFormattedPrice] = useState("");
	const [city, setCity] = useState("");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			city: "",
			district: "",
			address: "",
			ward: "",
			title: "",
			description: "",
			amenities: "",
			area: 0,
			tenantType: "",
			price: 0,
			rentalType: ""
		}
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newImages = Array.from(e.target.files);
			if (images.length + newImages.length > 6) {
				toast({
					title: "Giới hạn hình ảnh",
					description: "Bạn chỉ có thể tải lên tối đa 6 hình ảnh.",
					variant: "destructive"
				});
				return;
			}
			setImages(prevImages => [...prevImages, ...newImages]);
		}
	};

	const removeImage = (index: number) => {
		setImages(prevImages => prevImages.filter((_, i) => i !== index));
	};

	const handleSelectImage = () => {
		if (images.length >= 6) {
			toast({
				title: "Giới hạn hình ảnh",
				description: "Bạn đã đạt đến giới hạn 6 hình ảnh.",
				variant: "destructive"
			});
			return;
		}
		fileInputRef.current?.click();
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<RentalPostResponse>>>(
		(data: {
			data: FormData,
			sessionToken: string
		}) => rentalPostApiRequest.createRentalPost(data)
	);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (images.length === 0) {
			toast({
				title: "Thiếu hình ảnh",
				description: "Vui lòng tải lên ít nhất 1 hình ảnh.",
				variant: "destructive"
			});
			return;
		}

		const formData = new FormData();
		formData.append("city", values.city);
		formData.append("district", values.district);
		formData.append("address", values.address);
		formData.append("ward", values.ward);
		formData.append("title", values.title);
		formData.append("description", values.description);
		formData.append("amenities", values.amenities);
		formData.append("area", values.area.toString());
		formData.append("tenantType", values.tenantType);
		formData.append("price", values.price.toString());
		formData.append("rentalType", values.rentalType);
		images.forEach((image, index) => {
			formData.append(`images`, image);
		});
		const res = await fetch({ data: formData, sessionToken: localStorage.getItem("token")! });
		// console.log(values);
		if (res?.code === 0) {
			toast({
				description: "Đăng bài thành công",
				title: "Thành công"
			});
			setShowConfirmDialog(true);
		} else {
			toast({
				description: "Đăng bài thất bại",
				title: "Thất bại"
			});
		}
	}

	const handleContinue = () => {
		setShowConfirmDialog(false);
		form.reset();
		setImages([]);
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
					<div className="space-y-4">
						<FormLabel className="text-lg font-semibold">Hình ảnh ({images.length}/6)</FormLabel>
						<input
							ref={fileInputRef}
							type="file"
							multiple
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
						/>
						<Button
							type="button"
							onClick={handleSelectImage}
							className="w-full flex items-center justify-center gap-2"
							disabled={images.length >= 6}
						>
							<Image className="w-5 h-5" />
							Chọn ảnh(tối đa 10MB mỗi ảnh và tối đa 6 ảnh)
						</Button>
						{images.length > 0 && (
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
								{images.map((file, index) => (
									<div key={index} className="relative group">
										<img
											src={URL.createObjectURL(file)}
											alt={`Selected ${index + 1}`}
											className="w-full h-32 object-cover rounded-md"
										/>
										<button
											type="button"
											onClick={() => removeImage(index)}
											className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<X size={16} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>

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
										<Input placeholder="125/2 Hòa Hưng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="ward"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Phường/Xã</FormLabel>
									<FormControl>
										<Input placeholder="Tân Phú Thạnh" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Tiêu đề</FormLabel>
									<FormControl>
										<Input placeholder="Cho thuê trọ ở Cái Răng, sinh viên" {...field} />
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
							name="amenities"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Tiện nghi</FormLabel>
									<FormControl>
										<Input placeholder="Đầy đủ (như ảnh)" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="area"

							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Diện tích (m²)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="1"
											   {...field}
											   onChange={e => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="tenantType"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Loại người thuê</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant="outline" role="combobox"
														className="w-full justify-between">
													{field.value || "Chọn loại người thuê"}
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

						<FormField
							control={form.control}
							name="rentalType"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Loại cho thuê</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant="outline" role="combobox"
														className="w-full justify-between">
													{field.value || "Chọn loại cho thuê"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput placeholder="Tìm kiếm loại cho thuê..." />
												<CommandList>
													<CommandEmpty>Không tìm thấy loại cho thuê.</CommandEmpty>
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
					</div>
					<Button type="submit" className="w-full text-lg py-6">
						{isFetching ? "Đang đăng bài..." : "Đăng bài"}
					</Button>
				</form>
			</Form>
			<Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Đăng bài thành công</DialogTitle>
						<DialogDescription>
							Bài đăng của bạn đã được tạo thành công. Bạn muốn làm gì tiếp theo?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Link href="./">
							<Button variant="outline">
								Quay lại
							</Button>
						</Link>
						<Button onClick={handleContinue}>Tiếp tục đăng bài</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}