import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import vietnamCitiesAndDistricts, { vietnamCities } from "@/constants/citiVietNam";

interface FilterProps {
	filters: {
		minPrice: number
		maxPrice: number
		minArea: string
		maxArea: string
		city: string
		district: string
		rentalType: string
		tenantType: string
		search: string
	};
	handleFilterChange: (key: string, value: string) => void;
	handleApplyFilter: () => void;
	minPrice: number;
	maxPrice: number;
}

const vietnamCitiesCustom = [
	{
		city: "Tất cả",
		districts: []
	},
	...vietnamCities
	// Add more cities and districts as needed
];

export default function RentalPostFilter({
											 filters,
											 handleFilterChange,
											 handleApplyFilter,
											 maxPrice,
											 minPrice
										 }: FilterProps) {
	const [openSetCity, setOpenSetCity] = React.useState(false);
	const [openSetDistrict, setOpenSetDistrict] = React.useState(false);

	const districts = filters.city && vietnamCitiesCustom.find((item) => item.city === filters.city)?.districts;

	const handleSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			handleFilterChange("minPrice", value[0].toString());
			handleFilterChange("maxPrice", value[1].toString());
		}
	};

	return (
		<div className="w-full lg:w-1/4 space-y-6 bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-semibold mb-4">Bộ lọc tìm kiếm</h2>

			<div className="space-y-2 mb-4">
				<Label htmlFor="search">Tìm kiếm</Label>
				<Input
					id="search"
					type="text"
					value={filters.search}
					onChange={(e) => handleFilterChange("search", e.target.value)}
					placeholder="Nhập từ khóa tìm kiếm..."
					className="w-full"
				/>
			</div>

			<div className="space-y-4">
				<Label>Khoảng giá (VND)</Label>
				<Slider
					range
					min={minPrice}
					max={maxPrice}
					step={1}
					value={[filters.minPrice, filters.maxPrice]}
					onChange={handleSliderChange}
					className="mb-2"
				/>
				<div className="flex justify-between">
					<Input
						type="number"
						value={filters.minPrice}
						onChange={(e) => handleFilterChange("minPrice", e.target.value)}
						className="w-[48%]"
						placeholder="Tối thiểu"
					/>
					<Input
						type="number"
						value={filters.maxPrice}
						onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
						className="w-[48%]"
						placeholder="Tối đa"
					/>
				</div>
			</div>

			<div className="space-y-4">
				<Label>Diện tích (m²)</Label>
				<div className="flex justify-between">
					<Input
						type="number"
						value={filters.minArea}
						onChange={(e) => handleFilterChange("minArea", e.target.value)}
						className="w-[48%]"
						placeholder="Tối thiểu"
					/>
					<Input
						type="number"
						value={filters.maxArea}
						onChange={(e) => handleFilterChange("maxArea", e.target.value)}
						className="w-[48%]"
						placeholder="Tối đa"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label>Thành phố/Tỉnh</Label>
				<Popover open={openSetCity} onOpenChange={setOpenSetCity}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={openSetCity}
							className="w-full justify-between"
						>
							{filters.city
								? vietnamCitiesCustom.find((framework) => framework.city === filters.city)?.city
								: "Chọn thành phố/tỉnh"}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput placeholder="Search framework..." />
							<CommandList>
								{/*<CommandEmpty>No framework found.</CommandEmpty>*/}
								<CommandGroup>
									{vietnamCitiesCustom.map((framework) => (
										<CommandItem
											key={framework.city}
											value={framework.city}
											onSelect={(currentValue) => {
												handleFilterChange("city", currentValue);
												setOpenSetCity(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													filters.city === framework.city ? "opacity-100" : "opacity-0"
												)}
											/>
											{framework.city}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<div className="space-y-2">
				<Label>Quận/Huyện</Label>
				<Popover open={openSetDistrict} onOpenChange={setOpenSetDistrict}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={openSetDistrict}
							className="w-full justify-between"
						>
							{filters.district
								? filters.district
								: "Chọn quận/huyện"}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput placeholder="Search framework..." />
							<CommandList>
								<CommandEmpty>No framework found.</CommandEmpty>
								<CommandGroup>
									{filters.city && vietnamCitiesCustom.find(item => {
										return item.city === filters.city;
									})?.districts.map((framework) => (
										<CommandItem
											key={framework}
											value={framework}
											onSelect={(currentValue) => {
												handleFilterChange("city", currentValue);
												setOpenSetCity(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													filters.city === framework ? "opacity-100" : "opacity-0"
												)}
											/>
											{framework}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<div className="space-y-2">
				<Label>Loại cho thuê</Label>
				<Select onValueChange={(value) => handleFilterChange("rentalType", value)}>
					<SelectTrigger>
						<SelectValue placeholder="Chọn loại cho thuê" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Tất cả">Tất cả</SelectItem>
						<SelectItem value="Tất cả">Tất cả</SelectItem>
						<SelectItem value="Phòng trọ">Phòng trọ</SelectItem>
						<SelectItem value="Căn hộ">Căn hộ</SelectItem>
						<SelectItem value="Nhà nguyên căn">Nhà nguyên căn</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Label>Đối tượng cho thuê</Label>
				<Select onValueChange={(value) => handleFilterChange("tenantType", value)}>
					<SelectTrigger>
						<SelectValue placeholder="Chọn đối tượng" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Tất cả">Tất cả</SelectItem>
						<SelectItem value="Học sinh">Học sinh</SelectItem>
						<SelectItem value="Sinh viên">Sinh viên</SelectItem>
						<SelectItem value="Người đi làm">Người đi làm</SelectItem>
						<SelectItem value="Gia đình">Gia đình</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Button onClick={handleApplyFilter} className="w-full">Áp dụng bộ lọc</Button>
		</div>
	);
}