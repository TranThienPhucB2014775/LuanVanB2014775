import React from "react";
import { authApiRequest } from "@/apiRequests";
import { cookies } from "next/headers";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Info, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function LandlordInfo({ landlordId }: { landlordId: string | undefined }) {

	if (!landlordId) return null;

	const cookieStore = cookies();


	const landlord = await authApiRequest.infoById(
		{
			userId: landlordId
			// sessionToken: cookieStore.get("sessionToken")?.value ?? ""
		}
	);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Thông tin chủ trọ</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="flex items-center space-x-2">
							<BadgeCheck className="h-4 w-4 text-primary" />
							<span className="font-medium">{landlord.payload?.result.username}</span>
						</div>
						<div className="flex items-center space-x-2">
							<Phone className="h-4 w-4 text-muted-foreground" />
							<span>{landlord.payload?.result.phoneNumber}</span>
						</div>
						<div className="flex items-center space-x-2">
							<Mail className="h-4 w-4 text-muted-foreground" />
							<span>{landlord.payload?.result.email}</span>
						</div>
					</div>
					<CardFooter className="p-0 flex justify-end">
						<Link
							href={`/user/${landlord?.payload?.result.id}`}
						>
							<Button variant="outline" className="p-3">
								<Info className="h-4 w-4" />
							</Button>
						</Link>
					</CardFooter>
				</CardContent>
			</Card>
		</>
	);
}

export default LandlordInfo;