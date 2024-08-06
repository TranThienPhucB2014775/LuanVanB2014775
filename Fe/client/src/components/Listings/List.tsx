import React from "react";
import Item from "./Item";
import logoGoogle from "@/assets/images/Google.png";
import Image from "next/image";
import { Button } from "../ui/button";

const products = [
	{
		id: "1",
		title: "Stylish Sunglasses",
		variants: [
			{ id: "v1", title: "Black Frame", price: 50.0 },
			{ id: "v2", title: "Brown Frame", price: 55.0 },
		],
		handle: "stylish-sunglasses",
		featuredImage: {
			url: logoGoogle,
			altText: "Stylish Sunglasses",
		},
		priceRange: {
			minVariantPrice: {
				amount: "50.00",
				currencyCode: "USD",
			},
		},
		compareAtPriceRange: {
			maxVariantPrice: {
				amount: "60.00",
				currencyCode: "USD",
			},
		},
		description:
			"These stylish sunglasses will make you look cool and protect your eyes from the sun.",
		availableForSale: true,
	},
	{
		id: "2",
		title: "Elegant Wristwatch",
		variants: [
			{ id: "v3", title: "Silver Band", price: 120.0 },
			{ id: "v4", title: "Gold Band", price: 150.0 },
		],
		handle: "elegant-wristwatch",
		featuredImage: {
			url: logoGoogle,
			altText: "Elegant Wristwatch",
		},
		priceRange: {
			minVariantPrice: {
				amount: "120.00",
				currencyCode: "USD",
			},
		},
		compareAtPriceRange: {
			maxVariantPrice: {
				amount: "180.00",
				currencyCode: "USD",
			},
		},
		description:
			"An elegant wristwatch that adds a touch of sophistication to any outfit.",
		availableForSale: true,
	},
	{
		id: "3",
		title: "Modern Backpack",
		variants: [
			{ id: "v5", title: "Black", price: 70.0 },
			{ id: "v6", title: "Grey", price: 75.0 },
		],
		handle: "modern-backpack",
		featuredImage: {
			url: logoGoogle,
			altText: "Modern Backpack",
		},
		priceRange: {
			minVariantPrice: {
				amount: "70.00",
				currencyCode: "USD",
			},
		},
		compareAtPriceRange: {
			maxVariantPrice: {
				amount: "90.00",
				currencyCode: "USD",
			},
		},
		description:
			"A modern backpack perfect for carrying your essentials with style.",
		availableForSale: true,
	},
];

function List({ items }: { items: any[] }) {
	// return (
	// 	<div className="w-full px-[21px]">
	// 		<div className="flex gap-x-[24px] gap-y-[32px] flex-wrap justify-center lg:justify-start">
	// 			{items.map((item) => (
	// 				<Item item={item} key={item.name} />
	// 			))}
	// 		</div>

	// 	</div>

	// );

	return (
		<div className="row space-y-10 px-20">
			{products.length === 0 ? (
				<div className="col-12 text-center text-gray-500 dark:text-gray-300">
					No products available
				</div>
			) : (
				products.map((product) => {
					const {
						id,
						title,
						variants,
						handle,
						featuredImage,
						priceRange,
						description,
						compareAtPriceRange,
					} = product;

					const defaultVariantId =
						variants.length > 0 ? variants[0].id : undefined;

					return (
						<div className="col-12" key={id}>
							<div className="flex flex-row gap-8">
								<div className="col-4">
									<Image
										src={
											featuredImage?.url ||
											"/images/product_image404.jpg"
										}
										width={267}
										height={273}
										alt={
											featuredImage?.altText ||
											"fallback image"
										}
										className="w-[267px] h-[150px] md:h-[273px] object-cover border dark:border-darkmode-border rounded-md"
									/>
								</div>

								<div className="col-8 py-3 max-md:pt-4">
									<h2 className="font-bold text-3xl md:font-normal h4">
										<a href={`/products/${handle}`}>
											{title}
										</a>
									</h2>

									<div className="flex items-center gap-x-2 mt-2">
										<span className="text-light dark:text-darkmode-light text-xs md:text-lg font-bold">
											{" "}
											{
												priceRange?.minVariantPrice
													?.amount
											}
											{" VND"}
										</span>
									</div>

									<p className="max-md:text-xs text-light dark:text-darkmode-light my-4 md:mb-8 line-clamp-1 md:line-clamp-3">
										{description ||
											"This is a placeholder description for the product. It provides an overview of the product's features and benefits."}
									</p>
									<Button variant="outline">
										<span className="w-20 text-base font-bold">
											Chi Tiết
										</span>
									</Button>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}

export default List;
