'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadPage() {
	const [file, setFile] = useState<File | null>(null)
	const [idNumber, setIdNumber] = useState('')
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0]
			setFile(selectedFile)
			setPreviewUrl(URL.createObjectURL(selectedFile))
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Xử lý upload hình ảnh và số căn cước ở đây
	}

	return (
		<Card className="max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="text-center">Upload hình ảnh và số căn cước</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="image">Hình ảnh</Label>
						<Input id="image" type="file" onChange={handleFileChange} className="cursor-pointer" />
						{previewUrl && (
							<div className="mt-4 flex justify-center">
								<Image src={previewUrl} alt="Preview" width={200} height={200} className="rounded-lg object-cover" />
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="idNumber">Số căn cước</Label>
						<Input
							id="idNumber"
							value={idNumber}
							onChange={(e) => setIdNumber(e.target.value)}
							placeholder="Nhập số căn cước"
						/>
					</div>
					<Button type="submit" className="w-full">Upload</Button>
				</form>
			</CardContent>
		</Card>
	)
}