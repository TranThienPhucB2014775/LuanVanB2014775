"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageFetcherProps {
	apiUrl: string;
	imgStyle?: React.CSSProperties;
	imgClassName?: string;
	imgAlt?: string;
}

const ImageFetcher: React.FC<ImageFetcherProps> = ({
													   apiUrl,
													   imgStyle,
													   imgClassName,
													   imgAlt = "Fetched from API"
												   }) => {
	const [imageUrl, setImageUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await fetch(apiUrl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					}
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					const data = await response.json();
					setImageUrl(data.imageUrl);
				} else {
					const blob = await response.blob();
					const url = URL.createObjectURL(blob);
					setImageUrl(url);
				}
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchImage();
	}, [apiUrl]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div >
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={imgAlt}
					layout="responsive"
					width={500}
					height={300}
					className={imgClassName}
					style={imgStyle}
				/>
			) : (
				<p>No image found</p>
			)}
		</div>
	);
};

export default ImageFetcher;