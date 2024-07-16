import React from "react";
import Input from "@/components/Input";
import Link from "next/link";
import ButtonCustom from "@/components/Button";
import FormRegister from "./form-register";

export default function Page() {
    return (
        <div className="w-full my-10 bg-white ct-center">
            <div className="w-[320px]">
                <div className="w-full bg-white">
                    <ButtonCustom claesses="border-[1px] border-solid border-Neutral-B500">
                        <Link href="/">
              <span className="capitalize">
                Tiếp tục mà không cần tài khoản
              </span>
                        </Link>
                    </ButtonCustom>
                    <div
                        className="my-[32px] relative w-full after:absolute after:top-1/2 after:left-0 after:w-full after:h-[1px] after:bg-black ct-center">
            <span className="text-center relative bg-white z-10 px-[5px]">
              Or
            </span>
                    </div>
                    <FormRegister/>
                </div>

                {/* <p className="text-[12px] leading-[2] text-Neutral-N500 capitalize">
          Bằng cách tạo tài khoản, bạn đồng ý với Điều khoản Dịch vụ và Chính
          sách Bảo mật của chúng tôi.
        </p> */}
            </div>
        </div>
    );
}
