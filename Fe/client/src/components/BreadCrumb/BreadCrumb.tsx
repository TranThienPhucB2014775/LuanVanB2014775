import BreadCrumbItem from "./BreadCrumbItem";

export default function BreadCrumb({ routeName, value }: { routeName: string; value: string }) {
	routeName === "" && (routeName = "Not Found");

	return (
		<div className="bg-Neutral-w100 w-full">
			<div className=" py-[20px] bg:py-[42px] px-[12px] max-w-ct-max-width mx-auto ">
				<div className="pb-[8px]">
					<p className="text-[24px] font-bold first-letter:uppercase">
						{routeName}
					</p>
				</div>
				<BreadCrumbItem routeName={routeName} value={value} />
			</div>
		</div>
	);
}
