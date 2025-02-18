export function formatDate(dateString: string): string {
	const date = new Date(dateString);

	const optionsDate: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric"
	};

	const readableDate = date.toLocaleDateString("vi-VN", optionsDate);

	const optionsTime: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false // Nếu bạn muốn sử dụng định dạng 24 giờ
	};

	const readableTime = date.toLocaleTimeString("vi-VN", optionsTime);

	return `${readableDate}, ${readableTime}`;

}

export function formatToDate(dateString: string): Date {
	return new Date(dateString);
}
