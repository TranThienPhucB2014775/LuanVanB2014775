import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FilterRevenue from "@/components/manage/dashboard/FilterRevenue";
import DashBoardChart from "@/components/manage/dashboard/DashBoardChart";
import { invoiceUnPaidResponse, SummaryResponse } from "@/dto/response/SummaryResponse";
import InvoiceUnPaidCard from "@/components/manage/InvoiceUnPaidCard";

// Giả định dữ liệu này được truyền vào component như một prop
const initialData: SummaryResponse = {
	totalApartments: 0,
	totalRoomTypes: 0,
	totalRooms: 0,
	totalTenants: 0,
	totalIncome: 0,
};

export default function Dashboard(
	{ data = initialData, invoiceUnPaid }:
		{ data?: SummaryResponse, invoiceUnPaid: invoiceUnPaidResponse | undefined }
) {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Tổng hợp</h1>

			{/* Thống kê tổng quan */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				<Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
					<CardHeader>
						<CardTitle>Tổng số dãy trọ</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{data.totalApartments}</p>
					</CardContent>
				</Card>
				<Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
					<CardHeader>
						<CardTitle>Tổng số loại phòng</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{data.totalRoomTypes}</p>
					</CardContent>
				</Card>
				<Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
					<CardHeader>
						<CardTitle>Tổng số phòng</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{data.totalRooms}</p>
					</CardContent>
				</Card>
				<Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
					<CardHeader>
						<CardTitle>Tổng số người đang thuê</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{data.totalTenants}</p>
					</CardContent>
				</Card>
				<Card className="col-span-full transition-all duration-300 hover:shadow-lg hover:scale-105">
					<CardHeader>
						<CardTitle>Tổng thu nhập</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold text-green-600">{data.totalIncome?.toLocaleString()} VND</p>
					</CardContent>
				</Card>
				{invoiceUnPaid && < InvoiceUnPaidCard invoiceUnPaid={invoiceUnPaid} />}
			</div>

			<DashBoardChart />
			{/*<FilterRevenue />*/}
		</div>
	);
}