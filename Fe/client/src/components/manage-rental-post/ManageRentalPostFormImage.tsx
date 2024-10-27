"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Save, Trash2, Edit } from "lucide-react";
import { RentalPostResponse } from "@/dto/response/rentalPost";
import { mediaLink } from "@/constants/media";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import ImageRentalPostApiRequest from "@/apiRequests/image";

// interface FormData {
// 	rentalPostId: string;
// 	city: string;
// 	district: string;
// 	address: string;
// 	ward: string;
// 	title: string;
// 	description: string;
// 	amenities: string;
// 	area: number;
// 	tenantType: string;
// 	price: string;
// 	rentalType: string;
// }

interface Image {
	id: string;
	url: string;
	isChanged: boolean;
	isExisting: boolean;
	file?: File;
	isNew?: boolean;
}

export default function RentalPostFormImage({ rentalPost }: { rentalPost: RentalPostResponse | undefined }) {
	const [images, setImages] = useState<Image[]>(
		rentalPost !== undefined && rentalPost.images.length > 0 &&
		rentalPost.images.map((img, index) => ({
			id: img.imageId,
			url: mediaLink + "/" + img.imageUrl,
			isChanged: false,
			isExisting: true,
			isNew: false
		})) || [{ id: Date.now().toString(), url: "", isChanged: false, isExisting: false }]
	);

	const {
		error: errorUpdate,
		isFetching: isFetchingUpdate,
		fetch: update
	} = useFetch<ApiResponse<result<string>>>(
		(data: {
			imageId: string,
			formData: FormData,
			sessionToken: string
		}) => ImageRentalPostApiRequest.updateImageRentalPost({
			imageId: data.imageId,
			formData: data.formData,
			sessionToken: data.sessionToken
		}));

	const {
		error: errorCreate,
		isFetching: isFetchingCreate,
		fetch: create
	} = useFetch<ApiResponse<result<string>>>(
		(data: {
			formData: FormData,
			sessionToken: string
		}) => ImageRentalPostApiRequest.createImageRentalPost(data));

	const {
		error: errorDelete,
		isFetching: isFetchingDelete,
		fetch: deleteImage
	} = useFetch<ApiResponse<result<string>>>(
		(data: {
			imageId: string,
			sessionToken: string
		}) => ImageRentalPostApiRequest.deleteImageRentalPost({
			imageId: data.imageId,
			sessionToken: data.sessionToken
		}));


	const [editingImageId, setEditingImageId] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const editFileInputRef = useRef<HTMLInputElement>(null);

	const handleAddImage = () => {
		if (images.length < 6) {
			fileInputRef.current?.click();
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>, id: string | null = null) => {
		const file = e.target.files?.[0];
		console.log(id);
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (id !== null) {
					setImages(prev => prev.map(img =>
						img.id === id ? { ...img, url: e.target?.result as string, file, isChanged: true } : img
					));
				} else {
					setImages(prev => [...prev, {
						id: Date.now().toString(),
						url: e.target?.result as string,
						file,
						isChanged: true,
						isExisting: false,
						isNew: true
					}]);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDeleteImage = (id: string) => {
		if (images.length > 1) {
			setImages(prev => prev.filter(img => img.id !== id));
		}
	};

	const handleSaveImage = async (id: string) => {
		// Here you would typically upload the image to your API

		const image = images.find(img => img.id === id);

		let res = null;

		if (image) {
			if (image.isNew) {
				console.log(`Creating image:`);
				const formData = new FormData();
				formData.append("postId", rentalPost?.rentalPostId || "");
				formData.append("images", image.file as File);
				res = await create({
					formData,
					sessionToken: localStorage.getItem("token") || ""
				});
			} else {
				console.log(`Updating image:`);
				const formData = new FormData();
				formData.append("image", image.file as File);
				res = await update({
					imageId: id.toString(),
					formData,
					sessionToken: localStorage.getItem("token") || ""
				});
			}
		}
		;

		// console.log("Saving image:", images.find(img => img.id === id));
		// setImages(prev => prev.map(img => img.id === id ? { ...img, isChanged: false } : img));
	};

	const handleEditImage = (id: string) => {
		setEditingImageId(id);
		editFileInputRef.current?.click();
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="container mx-auto px-4">
				<Card>
					<CardHeader>
						<CardTitle>Hình ảnh</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{images.map((image) => (
								<div key={image.id} className="relative group max-h-40">
									<img
										src={image.url}
										alt="Rental property"
										className="w-full h-full object-contain rounded-lg"
									/>
									<div
										className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
										<Button variant="secondary" size="icon" className="mr-2"
												onClick={() => handleEditImage(image.id)}>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="secondary"
											size="icon"
											className="mr-2"
											onClick={() => handleSaveImage(image.id)}
											disabled={!image.isChanged}
										>
											<Save className="h-4 w-4" />
										</Button>
										<Button variant="destructive" size="icon"
												onClick={() => handleDeleteImage(image.id)}>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
							{images.length < 6 && (
								<Button variant="outline" className="h-40 w-full" onClick={handleAddImage}>
									<PlusCircle className="mr-2 h-4 w-4" /> Thêm ảnh
								</Button>
							)}
						</div>
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							accept="image/*"
							onChange={(e) => handleFileChange(e)}
						/>
						<input
							type="file"
							ref={editFileInputRef}
							className="hidden"
							accept="image/*"
							onChange={(e) => handleFileChange(e, editingImageId)}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}