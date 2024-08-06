"use client";

import React, { useState } from "react";

import ChevronRight from "@/assets/icons/right-arrow.png";
import Pagination from "@/components/Pageinate";
import { motion } from "framer-motion";
import { AppliedFilters, List, SideBar } from "@/components/Listings";

const categoriesValue = [
	{ name: "Chung cư", checked: false },
	{ name: "Phòng trọ bình dân", checked: false },
	{ name: "Phòng trọ giá rẻ", checked: false },
	{ name: "Căn hộ cao cấp", checked: false },
	{ name: "homestay", checked: false },
];
const sizeValue = [
	{ sl: 1, checked: false },
	{ sl: 2, checked: false },
	{ sl: 3, checked: false },
	{ sl: 4, checked: false },
	{ sl: 5, checked: false },
];

const items = [
	{
		name: "Sản phẩm 1",
		price: 19.99,
		img: "https://example.com/product1.jpg",
	},
	{
		name: "Sản phẩm 2",
		price: 29.99,
		img: "https://example.com/product2.jpg",
	},
	{
		name: "Sản phẩm 3",
		price: 39.99,
		img: "https://example.com/product3.jpg",
	},
	{
		name: "Sản phẩm 4",
		price: 14.99,
		img: "https://example.com/product4.jpg",
	},
	{
		name: "Sản phẩm 5",
		price: 24.99,
		img: "https://example.com/product5.jpg",
	},
	{
		name: "Sản phẩm 6",
		price: 34.99,
		img: "https://example.com/product6.jpg",
	},
	{
		name: "Sản phẩm 7",
		price: 9.99,
		img: "https://example.com/product7.jpg",
	},
	{
		name: "Sản phẩm 8",
		price: 19.99,
		img: "https://example.com/product8.jpg",
	},
	{
		name: "Sản phẩm 9",
		price: 29.99,
		img: "https://example.com/product9.jpg",
	},
];

function Page() {
	const [categories, setCategories] = useState(categoriesValue);
	const [sizes, setSizes] = useState(sizeValue);
	const [currentPage, setCurrentPage] = useState(0);
	const [arrange, setArrange] = useState("up");

	const handlePageChange = ({ selected }: { selected: number }) => {
		setCurrentPage((prev) => selected + 1);
	};

	function handleCheckedCategories(categoryName: string) {
		const newCategories = categories.map((item) => {
			if (item.name === categoryName) {
				return { ...item, checked: !item.checked };
			}
			return item;
		});
		setCategories(newCategories);
	}

	function handleCheckedSizes(sizeName: number) {
		const newSize = sizes.map((item) => {
			if (item.sl === sizeName) {
				return { ...item, checked: !item.checked };
			}
			return item;
		});
		setSizes(newSize);
	}

	function handleChangeArrange(arrangeName: string) {
		console.log(arrangeName);
		console.log(arrange);
		if (arrangeName === "up") {
			setArrange("down");
		} else {
			setArrange("up");
		}
	}

	const prev = (
		<div className="Previous w-10 h-10 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex rotate-180">
			<img srcSet={`${ChevronRight} 2x`} alt={"ChevronLeft"} />
		</div>
	);

	return (
		<div className="max-w-ct-max-width my-[32px] w-full container">
			<div className="flex flex-col lg:flex-row">
				<SideBar
					Categories={categories}
					sizes={sizes}
					arrange={arrange}
					setArrange={handleChangeArrange}
					setSizes={handleCheckedSizes}
					setCategories={handleCheckedCategories}
				/>
				<div className="flex flex-col gap-[16px]">
					<AppliedFilters
						Categories={categories}
						sizes={sizes}
						arrange={arrange}
						setArrange={handleChangeArrange}
						setSizes={handleCheckedSizes}
						setCategories={handleCheckedCategories}
					/>
					<List items={items} />
					{/*<Pageinate />*/}
					<Pagination
						handlePageClick={handlePageChange}
						pageCount={5}
						currentPage={currentPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default Page;
