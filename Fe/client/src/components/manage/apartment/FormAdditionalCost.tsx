"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { additionalCostCreationRequest } from "@/dto/request/AdditionalCostRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { additionalCostResponsesType, apartmentResponse } from "@/dto/response/apartmentResponse";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { apartmentRequest } from "@/dto/request/apartment";
import apartmentApiRequest from "@/apiRequests/apartment";
import additionalCostRequest from "@/apiRequests/additionalCost";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { result } from "@/dto/result";
import { additionalCostTypes } from "@/constants/additionalCost";

function FormAdditionalCost(
	{
		additionalCost,
		apartmentId,
		createAdditionalCost,
		updateAdditionalCost
	}: {
		additionalCost: additionalCostResponsesType | null;
		apartmentId: string | null;
		createAdditionalCost: Function;
		updateAdditionalCost: Function;
	}) {

	const {
		error: errorCreate,
		isFetching: isFetchingCreate,
		fetch: create
	} = useFetch<ApiResponse<result<additionalCostResponsesType>>>(
		(
			{
				data,
				apartmentId,
				sessionToken
			}: {
				data: typeof additionalCostCreationRequest;
				apartmentId: string;
				sessionToken: string;
			}
		) => additionalCostRequest.createAdditionalCost({ data, apartmentId, sessionToken })
	);

	const {
		error: errorUpdate,
		isFetching: isFetchingUpdate,
		fetch: update
	} = useFetch<ApiResponse<result<additionalCostResponsesType>>>(
		(
			{
				data,
				additionalCostId,
				sessionToken
			}: {
				data: typeof additionalCostCreationRequest;
				additionalCostId: string;
				sessionToken: string;
			}
		) => additionalCostRequest.updateAdditionalCost({ data, additionalCostId, sessionToken })
	);


	const form = useForm<z.infer<typeof additionalCostCreationRequest>>({
		resolver: zodResolver(additionalCostCreationRequest),
		defaultValues: {
			additionalCostType: additionalCost !== null ? additionalCost.additionalCostType : "",
			name: additionalCost !== null ? additionalCost.name : "",
			cost: additionalCost !== null ? additionalCost.cost : 0,
			unit: additionalCost !== null ? additionalCost.unit : ""
		}
	});

	const { toast } = useToast();

	async function onSubmit(values: z.infer<typeof additionalCostCreationRequest>) {
		let res;

		if (additionalCost !== null) {
			res = await update({
				data: values,
				additionalCostId: additionalCost.additionalCostId,
				sessionToken: localStorage.getItem("token")!
			});
		} else {
			res = await create({
				data: values,
				apartmentId: apartmentId!,
				sessionToken: localStorage.getItem("token")!
			});
		}

		if (res?.code === 0) {
			toast(
				{
					title: "Thành công",
					description: "Thành công"
				}
			);
			if (additionalCost !== null) {
				updateAdditionalCost(
					{
						name: values.name,
						cost: values.cost,
						additionalCostType: values.additionalCostType,
						unit: values.unit,
						// @ts-ignore
						additionalCostId: additionalCost.additionalCostId
					}
				);
			} else {
				createAdditionalCost(
					{
						name: values.name,
						cost: values.cost,
						additionalCostType: values.additionalCostType,
						unit: values.unit,
						// @ts-ignore
						additionalCostId: res.payload.result.additionalCostId
					}
				);
			}
		} else {
			toast(
				{
					title: "Thất bại",
					description: "Thất bại",
					variant: "destructive"
				}
			);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên chi phí</FormLabel>
							<FormControl>
								<Input placeholder="Tên" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cost"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Giá</FormLabel>
							<FormControl>
								<Input
									placeholder="Giá"
									type="number"
									min={0}
									{...field}
									onChange={(e) => {
										const value = e.target.value;
										field.onChange(value ? Number(value) : 0);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="unit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Đơn vị</FormLabel>
							<FormControl>
								<Input placeholder="Đơn vị" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="additionalCostType"
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Chọn cách tính chi phí" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										additionalCostTypes.map((type, index) =>
											<SelectItem key={index} value={type.value}>
												{type.name}
											</SelectItem>)
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

export default FormAdditionalCost;