import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListNotification from "@/components/notifacation/ListNotification";

function Page() {

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Thông báo</h1>
			<ListNotification />
		</div>
	);
}

export default Page;