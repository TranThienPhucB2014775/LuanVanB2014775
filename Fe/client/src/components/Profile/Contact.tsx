import Input from "@/components/Input";
import React from "react";
import { Button } from "@/components/ui/button";

function Contact() {

    function handleSubmitForm() {
        // e.preventDefault()
        // const fd = new FormData(e.target)
        // const data = Object.fromEntries(fd.entries())


    }

    return (
        <div className=" w-full lg:w-[750px] h-20 justify-between items-center inline-flex last">
            <div>
                <form className='mt-[32px] lg:w-[550px]' onSubmit={handleSubmitForm} method='post'>
                    <div className=''>
                        <span className='text-[14px] leading-[175%]'>Số Điện Thoại</span>
                        <Input
                            placeholder='Hãy nhập địa chỉ Số Điện Thoại'
                            typeInput='text'
                            name='number'
                        />
                    </div>
                    <div className='mt-[15px]'>
                        <span className='text-[14px] leading-[175%] capitalize'>Facebook</span>
                        <Input
                            placeholder='Hãy nhập liên kết Facebook'
                            typeInput='text'
                            name='facebook'
                        />
                    </div>
                    <div className='mt-[15px]'>
                        <span className='text-[14px] leading-[175%] capitalize'>Địa chỉ liên hệ</span>
                        <Input
                            placeholder='Hãy nhập địa chỉ liên hệ'
                            typeInput='text'
                            name='facebook'
                        />
                    </div>
                    <button className='w-full' type='submit'>
                        <Button>
                            <span className='text-white'>Lưu</span>
                        </Button>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;