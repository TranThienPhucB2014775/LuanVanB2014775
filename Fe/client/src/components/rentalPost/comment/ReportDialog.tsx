import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

interface ReportDialogProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onReport: (e: string) => Promise<void>;
}

const ReportDialog: React.FC<ReportDialogProps> = ({ isOpen, onOpenChange, onReport }) => {
	const [reportReason, setReportReason] = useState("");

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="sm">
					<Flag className="mr-2 h-4 w-4" />
					Report
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Report Comment</DialogTitle>
					<DialogDescription>
						Please provide a reason for reporting this comment.
					</DialogDescription>
				</DialogHeader>
				<Textarea
					placeholder="Enter your reason here..."
					value={reportReason}
					onChange={(e) => setReportReason(e.target.value)}
				/>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
					<Button onClick={() => {
						onReport(reportReason);
						onOpenChange(false);
					}}>Submit Report</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ReportDialog;