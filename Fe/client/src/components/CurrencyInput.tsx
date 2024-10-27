import React, { forwardRef } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { formatCurrency } from "@/util/formatCurrency";
import { Input } from "@/components/ui/input";

interface CurrencyInputProps extends UseControllerProps {
	placeholder?: string;
	disabled?: boolean;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
	({ name, control, placeholder, disabled }, ref) => {
		const { field } = useController({ name, control });

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.replace(/\./g, "");
			field.onChange(parseFloat(value));
		};

		return (
			<Input
				type="text"
				value={field.value ? formatCurrency(field.value) : ""}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disabled}
				className="input-class" // Add your input class here
				ref={ref}
			/>
		);
	}
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;