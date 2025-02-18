import React from 'react';

function RentalUnits() {
    return (
        <div className="w-full lg:w-[750px] h-20 justify-between items-center inline-flex">
            <div className="justify-end items-center gap-8 flex">
                <div
                    className=" w-20 self-stretch px-[11px] bg-neutral-100 rounded justify-center items-center gap-2.5 inline-flex">
                    <img className="ProductImage w-11 h-[62px]"
                         src="https://via.placeholder.com/44x62"/>
                </div>
                <div
                    className=" self-stretch flex-col justify-center items-start inline-flex">
                    <div
                        className=" ct-text-primary text-Neutral-N800">Raw Black T-Shirt Lineup
                    </div>
                    <div
                        className=" ct-text-secondary text-Neutral-N500">Tạo ngày : 27 July 2023
                    </div>
                    <div
                        className="ct-text-secondary ">$70.00
                    </div>
                </div>
            </div>
            <div className="StatusView justify-end items-center gap-8 flex">
                <div
                    className="Status border-b border-gray-900 justify-end items-center gap-2.5 flex hover:border-0">
                    <div className="ct-text-primary">Chỉnh Sửa</div>
                </div>
                <div
                    className="Button px-6 py-3 bg-white rounded border border-Neutral-N900 justify-start items-center gap-1.5 flex hover:opacity-75 hover:border-Neutral-N400">
                    <div className="ct-text-primary">Chi tiết</div>
                </div>
            </div>
        </div>
    );
}

export default RentalUnits;