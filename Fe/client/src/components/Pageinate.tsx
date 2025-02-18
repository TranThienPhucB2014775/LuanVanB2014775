import ReactPaginate from "react-paginate";
import ChevronRight from "../assets/icons/right-arrow.png";
import { useState } from "react";
import Image from "next/image";

const Pagination = ({ pageCount = 5, handlePageClick, currentPage }: {
	pageCount: number,
	handlePageClick: any,
	currentPage: number
}) => {
	return (
		<>
			<div className="col-span-12">
				<div className="flex items-center justify-center gap-2">
					<ReactPaginate
						breakLabel="..."
						nextLabel={
							<div
								className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground
             h-10 py-2 px-4 animate-fade-in ${currentPage === pageCount -1 && "opacity-0"} `}
							>
								Next
							</div>
						}
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						pageCount={pageCount}
						previousLabel={
							<div
								className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground
             h-10 py-2 px-4 animate-fade-in ${currentPage === 0  && "opacity-0"} `}
							>
								Prev
							</div>
						}
						renderOnZeroPageCount={null}
						containerClassName="inline-flex items-center justify-between gap-2 animate-fade-in"
						pageClassName="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4 w-fit animate-fade-in"
						nextClassName="Page w-10 h-8 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex animate-fade-in"
						nextLinkClassName="text-zinc-600 text-xs font-medium font-['Inter'] capitalize leading-normal"
						breakClassName="Dots w-10 h-8 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex animate-fade-in"
						breakLinkClassName="text-zinc-600 text-sm font-medium font-['Inter'] leading-normal"
						activeClassName="bg-primary text-primary-foreground animate-fade-in"
						forcePage={currentPage}
					/>
				</div>
			</div>
		</>
	);
};

export default Pagination;
