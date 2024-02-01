import React from "react";
import Person from "../../interfaces/interfacePerson";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TransItemProps {
    id?: string,
    index?: string,
    desc?: string,
    payerName?: string,
    amount?: string,
    isHeader?: boolean
}

export default function TransItem({id, index, desc, payerName, amount, isHeader}: TransItemProps) {
    return (
        <div 
            className={[
                "w-full flex gap-2 px-4 py-2",
                "dark:text-gray-100",
                isHeader ? "font-bold" : "border-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600",
            ].join(" ")}
        >
            <div className="w-[30px]">
                <span>{index || ""}</span>
            </div>
            <div className="w-1/2">
                <span>{desc || ""}</span>
            </div>
            <div className={[
                "w-1/4 text-center",
                "hidden sm:block",
            ].join(" ")}>
                <span>{payerName || ""}</span>
            </div>
            <div
                className={[
                    "w-1/4 text-right",
                ].join(" ")}
            >
                <span>{amount || ""}</span>
            </div>
            <div className="w-[80px] flex items-center justify-end gap-2">
                {
                    isHeader ? <>
                    </> : <>
                        <Link to={`/gbill-react/trans/edit/${id}`} className="transition hover:scale-110">
                            <EditIcon />
                        </Link>
                        <button>
                            <DeleteIcon />
                        </button>
                    </>
                }
            </div>
        </div>
    )
}