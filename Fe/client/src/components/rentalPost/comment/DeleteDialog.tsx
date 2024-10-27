import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onOpenChange, onDelete }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="sm">
					<Trash2 className="mr-2 h-4 w-4" />
					Xóa
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Xóa bình luận</DialogTitle>
					<DialogDescription>
						Bạn có chắc chắn muốn xóa bình luận này không?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
					<Button onClick={() => {
						onDelete();
						onOpenChange(false);
					}}>Xóa</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteDialog;