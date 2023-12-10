import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TransItemProps {
    index?: string,
    desc?: string,
    payee?: string,
    amount?: string,
    isHeader?: boolean
}

export default function TransItem({index, desc, payee, amount, isHeader}: TransItemProps) {
    return (
        <div 
            className={[
                "w-full flex gap-2 px-4 py-2 text-gray-600",
                isHeader ? "font-bold" : "border-2 rounded-lg",
            ].join(" ")}
        >
            <div className="w-[30px]">
                <span>{index || ""}</span>
            </div>
            <div className="w-1/2">
                <span>{desc || ""}</span>
            </div>
            <div className="w-1/4 text-center">
                <span>{payee || ""}</span>
            </div>
            <div
                className={[
                    "w-1/4 text-right",
                ].join(" ")}
            >
                <span>{amount || ""}</span>
            </div>
            <div className="w-[80px] flex justify-end gap-2">
                {
                    isHeader ? <>
                    </> : <>
                        <button><FaEdit /></button>
                        <button><FaTrash /></button>
                    </>
                }
            </div>
        </div>
    )
}