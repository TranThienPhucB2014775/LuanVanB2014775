import React from "react";
import Item from "./Item";

function List({ items }: { items: any[] }) {
	return (
		<div className="w-full px-[21px]">
			<div className="flex gap-x-[24px] gap-y-[32px] flex-wrap justify-center lg:justify-start">
				{items.map((item) => (
					<Item item={item} key={item.name} />
				))}
			</div>
		</div>
	);
}

export default List;
