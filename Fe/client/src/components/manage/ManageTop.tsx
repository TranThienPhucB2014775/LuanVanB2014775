import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function ManageTop({
					   setParams,
					   children,
					   setSearch,
					   title,
					   description,
					   icon,
					   isManage = true
				   }: {
					   setParams: Function;
					   children: React.ReactNode;
					   setSearch: Function,
					   title: string,
					   description: string,
					   icon: React.ReactNode,
					   isManage?: boolean
				   }
) {
	const formSchema = z.object({
		username: z.string()
	});

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: ""
		}
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setSearch(values.username);
	}

	const pathName = usePathname();

	function handlePageChange() {
		router.push(`${pathName}/form`);
	}

	return (
		<>
			<div
				className="flex text-gray-500 justify-start items-start
				flex-col sm:flex-row sm:justify-between sm:items-center pt-4"
			>
				<div className="flex items-start justify-start sm:justify-between sm:items-center gap-2 h-10">
					<div className="border rounded-full w-10 h-10 flex items-center justify-center">
						{icon}
					</div>
					<div>
						<h1 className="text-sm font-semibold text-gray-800">{title}</h1>
						<p className="text-xs font-medium text-gray-500">
							{description}
						</p>
					</div>
				</div>
				<div className="text-gray-500 md:flex gap-2 flex flex-row justify-between w-full sm:w-fit">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="Tìm kiếm" {...field} className="h-8" />
										</FormControl>
									</FormItem>
								)}
							/>
						</form>
					</Form>
					{isManage && <Button
						className="h-8 gap-1 bg-primary w-36 py-1 px-2 duration-200 text-white rounded-lg text-xs
                        md:flex items-center justify-center flex flex-row"
						onClick={handlePageChange}
					>
						<PlusIcon width={16} />
						<div>
							<span className=" md:inline">Thêm Mới</span>
						</div>
					</Button>}

				</div>
			</div>
			{children}
		</>
	);
}

export default ManageTop;