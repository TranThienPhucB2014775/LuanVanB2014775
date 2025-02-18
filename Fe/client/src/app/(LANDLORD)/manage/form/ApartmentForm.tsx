"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@heroicons/react/16/solid";

import { cn } from "@/lib/utils";
import { useFetch } from "@/useFetch";
import { useToast } from "@/components/ui/use-toast";
import { apartmentRequest } from "@/dto/request/apartment";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import apartmentApiRequest from "@/apiRequests/apartment";
import { apartments } from "@/constants/apartment";
import { vietnamCities } from "@/constants/citiVietNam";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/dto/ApiResponse";

function ApartmentForm({ apartment = null, apartmentId }: {
	apartment: apartmentResponse | null | undefined,
	apartmentId: string
}) {
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [city, setCity] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const {
		error: errorUpdate,
		isFetching: isFetchingUpdate,
		fetch: fetchUpdate
	} = useFetch<ApiResponse<apartmentResponse>>(
		(data: { sessionToken: string, data: typeof apartmentRequest, apartmentId: string }) =>
			apartmentApiRequest.updateApartment(data)
	);

	const { error, isFetching, fetch } = useFetch<ApiResponse<apartmentResponse>>(
		(data: { sessionToken: string, data: typeof apartmentRequest }) =>
			apartmentApiRequest.createApartment(data)
	);

	const form = useForm<z.infer<typeof apartmentRequest>>({
		resolver: zodResolver(apartmentRequest),
		defaultValues: {
			address: apartment?.address || "",
			name: apartment?.name || "",
			rule: apartment?.rule || "",
			utility: apartment?.utility || "",
			apartmentType: apartment?.apartmentType || "",
			description: apartment?.description || "",
			city: apartment?.city || ""
		}
	});

	async function onSubmit(values: z.infer<typeof apartmentRequest>) {

		let res;

		if (apartment) {
			res = await fetchUpdate({ sessionToken: localStorage.getItem("token"), data: values, apartmentId });
		} else {
			res = await fetch({ sessionToken: localStorage.getItem("token"), data: values });
		}

		if (res?.code === 0) {
			toast({ description: apartment ? "Cập nhật thành công" : "Tạo mới thành công" });
			setShowConfirmDialog(true);
		} else {
			toast({ description: apartment ? "Cập nhật thất bại" : "Tạo mới thất bại", variant: "destructive" });
		}
	}

	const handleContinue = () => {
		setShowConfirmDialog(false);
		if (!apartment) {
			form.reset();
		}
	};

	return (
		<div className="py-4">
			<Card className="w-full max-w-3xl mx-auto">
				<CardHeader>
					<CardTitle>{apartment ? "Cập nhật khu trọ" : "Tạo mới khu trọ"}</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên</FormLabel>
											<FormControl>
												<Input placeholder="Hãy nhập Tên" {...field} />
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
												<Input placeholder="Hãy nhập Địa chỉ" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="apartmentType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Loại khu trọ</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															role="combobox"
															className={cn(
																"w-full justify-between",
																!field.value && "text-muted-foreground"
															)}
														>
															{field.value
																? apartments.find((language) => language.value === field.value)?.name
																: "Chọn loại khu trọ..."}
															<CaretSortIcon
																className="ml-2 h-4 w-4 shrink-0 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-full p-0">
													<Command>
														<CommandInput placeholder="Tìm kiếm..." className="h-9" />
														<CommandList>
															<CommandEmpty>Không tìm thấy loại khu trọ.</CommandEmpty>
															<CommandGroup>
																{apartments.map((language) => (
																	<CommandItem
																		value={language.name}
																		key={language.value}
																		onSelect={() => {
																			form.setValue("apartmentType", language.value);
																		}}
																	>
																		{language.name}
																		<CheckIcon
																			className={cn(
																				"ml-auto h-4 w-4",
																				language.value === field.value
																					? "opacity-100"
																					: "opacity-0"
																			)}
																		/>
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
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tỉnh/Thành phố</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															role="combobox"
															className={cn(
																"w-full justify-between",
																!field.value && "text-muted-foreground"
															)}
														>
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
							</div>

							<FormField
								control={form.control}
								name="utility"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tiện ích</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Hãy nhập Tiện ích"
												{...field}
												className="h-32 resize-none"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rule"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quy tắc</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Hãy nhập Quy tắc"
												{...field}
												className="h-32 resize-none"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mô tả</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Nội dung"
												{...field}
												className="h-44 resize-none"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end space-x-4">
								<Button type="submit" className="w-40">
                <span className="text-white">
                  {apartment ? "Cập nhật" : "Tạo mới"}
                </span>
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>

				<Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Xác nhận</DialogTitle>
							<DialogDescription>
								Bạn có muốn tiếp tục hay quay lại trang trước?
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className="sm:justify-start">
							<Button onClick={handleContinue}>Tiếp tục</Button>
							<Link href="/manage">
								<Button variant="outline">
									Quay lại
								</Button>
							</Link>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</Card>
		</div>
	);
}

export default ApartmentForm;