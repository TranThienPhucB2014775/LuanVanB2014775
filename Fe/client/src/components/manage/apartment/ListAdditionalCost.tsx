"use client";

import React, { useState } from "react";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilIcon, Zap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormAdditionalCost from "@/components/manage/apartment/FormAdditionalCost";
import DeleteAdditionalCost from "@/components/manage/apartment/DeleteAdditionalCost";

function ListAdditionalCost({ additionalCosts, isManage, apartmentId }: {
	additionalCosts: Array<additionalCostResponsesType> | undefined;
	isManage: boolean;
	apartmentId: string
}) {

	const [data, setData] = useState(additionalCosts);

	function createAdditionalCost(additionalCost: additionalCostResponsesType) {
		if (data === undefined) {
			setData([additionalCost]);
		} else {
			setData([...data, additionalCost]);
		}
	}

	function updateAdditionalCost(additionalCost: additionalCostResponsesType) {
		setData((prevData) => {
			if (!prevData) return [additionalCost];
			const index = prevData.findIndex((value) => value.additionalCostId === additionalCost.additionalCostId);
			if (index !== -1) {
				const newData = [...prevData];
				newData[index] = additionalCost;
				return newData;
			}
			return prevData;
		});
	}

	function deleteAdditionalCost(additionalCostId: string) {
		setData((prevData) => {
			if (!prevData) return [];
			const index = prevData.findIndex((value) => value.additionalCostId === additionalCostId);
			if (index !== -1) {
				const newData = [...prevData];
				newData.splice(index, 1);
				return newData;
			}
			return prevData;
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-semibold flex items-center gap-2">
					<Zap className="w-5 h-5" /> Giá tiền các chi phí
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tiện ích</TableHead>
							<TableHead>Giá</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data !== undefined && data.map((value, index) => (
							// <TableRow key={index}>
							// 	<TableCell className="font-medium">{value.name}</TableCell>
							// 	<TableCell>{value.cost.toLocaleString("de-DE")} {value.unit}</TableCell>
							// </TableRow>
							<TableRow key={index}>
								<TableCell>{value.name}</TableCell>
								<TableCell>${value.cost.toLocaleString("de-DE")} {value.unit}</TableCell>
								{isManage &&
									<>
										<TableCell className="flex flex-row gap-2">
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant="outline"
														size="icon"
													>
														<PencilIcon className="h-4 w-4" />
														<span className="sr-only">Edit</span>
													</Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[425px]">
													<DialogHeader>
														<DialogTitle>Chỉnh sửa chi phí</DialogTitle>
													</DialogHeader>
													<FormAdditionalCost
														additionalCost={value}
														apartmentId={null}
														updateAdditionalCost={(additionalCost: additionalCostResponsesType) => updateAdditionalCost(additionalCost)}
														createAdditionalCost={(additionalCost: additionalCostResponsesType) => createAdditionalCost(additionalCost)}
													/>
												</DialogContent>
											</Dialog>
											<DeleteAdditionalCost additionalCostId={value.additionalCostId}
																  deleteAdditionalCost={deleteAdditionalCost} />
										</TableCell>
									</>
								}
							</TableRow>
						))}
					</TableBody>
				</Table>
				{isManage &&
					<>
						<Dialog>
							<DialogTrigger asChild>
								<div className="mt-4">
									<Button>
										<Zap className="w-4 h-4 mr-2" />
										Thêm mới chi phí
									</Button>
								</div>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Thêm mới chi phí</DialogTitle>
								</DialogHeader>
								<FormAdditionalCost
									additionalCost={null}
									apartmentId={apartmentId}
									createAdditionalCost={(additionalCost: additionalCostResponsesType) => createAdditionalCost(additionalCost)}
									updateAdditionalCost={(additionalCost: additionalCostResponsesType) => updateAdditionalCost(additionalCost)}
								/>
							</DialogContent>
						</Dialog>
					</>
				}
			</CardContent>
		</Card>
	);
}

export default ListAdditionalCost;