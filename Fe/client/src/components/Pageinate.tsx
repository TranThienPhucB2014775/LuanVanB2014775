import ReactPaginate from 'react-paginate';
import ChevronRight from '../assets/icons/right-arrow.png';
import {useState} from "react";
import Image from "next/image";

const Pagination = ({pageCount = 5, handlePageClick, currentPage}: {
    pageCount: number,
    handlePageClick: any,
    currentPage: number
}) => {
    return (
        <div className="w-full ct-center">
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <div
                        className={`Next w-10 h-10 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex 
                        ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Image src={ChevronRight} alt="ChevronRight"/>
                    </div>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={
                    <div className={`Next w-10 h-10 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex 
                        ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} rotate-180`
                    }>
                        <Image src={ChevronRight} alt={'ChevronLeft'}/>
                    </div>
                }
                renderOnZeroPageCount={null}
                containerClassName="Pagination w-[344px] h-11 px-2 rounded border border-gray-200 justify-start items-center gap-2 inline-flex"
                pageClassName="Page w-10 h-8 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex"
                pageLinkClassName="text-zinc-600 text-xs font-medium font-['Inter'] capitalize leading-normal"
                previousClassName="Page w-10 h-8 px-[13px] rounded flex-col justify-center items-center gap-2.5 inline-flex"
                previousLinkClassName="text-gray-900 text-xs font-medium font-['Inter'] capitalize leading-normal"
                nextClassName="Page w-10 h-8 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex"
                nextLinkClassName="text-zinc-600 text-xs font-medium font-['Inter'] capitalize leading-normal"
                breakClassName="Dots w-10 h-8 px-[13px] flex-col justify-center items-center gap-2.5 inline-flex"
                breakLinkClassName="text-zinc-600 text-sm font-medium font-['Inter'] leading-normal"
                activeClassName="bg-neutral-100 rounded"
            />
        </div>
    );
};

export default Pagination;
