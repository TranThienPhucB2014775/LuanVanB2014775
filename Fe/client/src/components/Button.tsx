import React from "react";

export default function ButtonCustom({
  children,
  claesses,
}: {
  children: React.ReactNode;
  claesses: string;
}) {
  return (
    <>
      <div
        className={`border- w-full h-[44px] border-1 rounded-[4px] ct-center ${claesses}`}>
        {children}
      </div>
    </>
  );
}
