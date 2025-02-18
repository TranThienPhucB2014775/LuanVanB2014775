export function formatCurrency(amount: number | undefined): string {
	if (amount === undefined) {
		return "0";
	}

	return new Intl.NumberFormat("vi-VN", {
		style: "decimal",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}