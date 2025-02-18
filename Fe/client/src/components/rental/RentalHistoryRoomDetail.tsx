import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, User } from "lucide-react";

const rooms = [
	{ id: 1, name: "Room A", status: "Occupied" },
	{ id: 2, name: "Room B", status: "Vacant" },
	{ id: 3, name: "Room C", status: "Occupied" }
];

const rentalHistory = [
	{ id: 1, roomName: "Room A", startDate: "2023-01-01", endDate: "2023-06-30" },
	{ id: 2, roomName: "Room B", startDate: "2023-02-15", endDate: "2023-08-15" },
	{ id: 3, roomName: "Room C", startDate: "2023-03-01", endDate: null }
];

const invoices = [
	{ id: 1, date: "2023-05-01", amount: 500 },
	{ id: 2, date: "2023-06-01", amount: 500 },
	{ id: 3, date: "2023-07-01", amount: 500 }
];

const coTenants = [
	{ id: 1, name: "John Doe" },
	{ id: 2, name: "Jane Smith" }
];

const landlord = {
	name: "Alice Johnson",
	phone: "123-456-7890",
	email: "alice@example.com"
};

function RentalHistoryRoomDetail(
	{
		selectedRoom,
		setSelectedRoom
	}: {
		selectedRoom: any;
		setSelectedRoom: (room: any) => void;
	}
) {
	return (
		<>
			{selectedRoom && (
				<Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
					<DialogContent className="max-w-4xl max-h-screen overflow-hidden flex flex-col">
						<DialogHeader>
							<DialogTitle>Thông tin {selectedRoom.name}</DialogTitle>
						</DialogHeader>
						<ScrollArea className="flex-grow flex flex-col gap-5">
							<div className="sm:p-4 pt-4">
								<Card>
									<CardHeader>
										<CardTitle>Invoices</CardTitle>
									</CardHeader>
									<CardContent className="p-0">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead className="w-[100px]">Date</TableHead>
													<TableHead>Amount</TableHead>
													<TableHead className="text-right">Action</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{invoices.map(invoice => (
													<TableRow key={invoice.id}>
														<TableCell className="font-medium">{invoice.date}</TableCell>
														<TableCell>${invoice.amount}</TableCell>
														<TableCell className="text-right">
															<Dialog>
																<DialogTrigger asChild>
																	<Button variant="outline" size="sm">
																		<FileText className="w-4 h-4 mr-2" />
																		Details
																	</Button>
																</DialogTrigger>
																<DialogContent className="sm:max-w-[425px]">
																	<DialogHeader>
																		<DialogTitle>Invoice Details</DialogTitle>
																	</DialogHeader>
																	<div className="grid gap-4 py-4">
																		<div
																			className="grid grid-cols-4 items-center gap-4">
																			<span className="font-bold">Date:</span>
																			<span
																				className="col-span-3">{invoice.date}</span>
																		</div>
																		<div
																			className="grid grid-cols-4 items-center gap-4">
																			<span className="font-bold">Amount:</span>
																			<span
																				className="col-span-3">${invoice.amount}</span>
																		</div>
																	</div>
																</DialogContent>
															</Dialog>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</CardContent>
								</Card>
							</div>
							<div className="sm:p-4 pt-4">
								<Card>
									<CardHeader>
										<CardTitle>Landlord Information</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<p><span className="font-semibold">Name:</span> {landlord.name}</p>
											<p><span className="font-semibold">Phone:</span> {landlord.phone}</p>
											<p><span className="font-semibold">Email:</span> {landlord.email}</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</ScrollArea>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}

export default RentalHistoryRoomDetail;