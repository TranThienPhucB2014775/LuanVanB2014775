import React from "react";

function Page({ params }: { params: { roomId: string } }) {
	return (
		<div>{params.roomId}</div>
	);
}

export default Page;