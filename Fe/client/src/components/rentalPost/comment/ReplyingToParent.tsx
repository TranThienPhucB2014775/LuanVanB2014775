import React from "react";
import { ArrowUp } from "lucide-react";
import { commentResponse } from "@/dto/response/comment";
import { CardContent } from "@/components/ui/card";

interface ReplyingToParentProps {
	commentParent: commentResponse;
	onScrollToParent: (parentId: string) => void;
}

const ReplyingToParent: React.FC<ReplyingToParentProps> = ({ commentParent, onScrollToParent }) => {
	return (
		<CardContent className="bg-gray-100 mt-2 rounded-md cursor-pointer pt-6"
					 onClick={() => onScrollToParent(commentParent.commentParent!.commentId)}>
			<div className="flex items-center">
				<ArrowUp className="mr-2 h-4 w-4" />
				<p className="text-sm font-semibold">Replying to {commentParent.commentParent.userName}</p>
			</div>
			<p className="text-sm truncate">{commentParent.commentParent.content}</p>
		</CardContent>
	);
};

export default ReplyingToParent;