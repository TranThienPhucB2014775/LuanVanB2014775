import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import verificationApiRequest from "@/apiRequests/verifycation";
import { cookies } from "next/headers";
import VerificationInfo from "@/components/Profile/VerificationInfo";
import { verificationResponse } from "@/dto/response/verification";
import VerificationForm from "@/components/Profile/VerificationForm";


export default async function UploadPage() {

	return < VerificationForm />;

}