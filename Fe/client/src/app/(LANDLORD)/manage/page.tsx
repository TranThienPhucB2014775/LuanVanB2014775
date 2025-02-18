"use server";

import React from "react";
import ListApartmentPage from "@/components/manage/apartment/ListApartmentPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function Page() {
	return (
		<ListApartmentPage userId="" isManage={true} />
	);
}

export default Page;