import { useContext } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext, DataContextProps } from "@common/contexts/dataContext";
import { IconButton } from "@mui/material";
import ITransaction from "@common/interfaces/interfaceTransaction";

interface TransItemProps extends Partial<ITransaction> {
    isHeader?: boolean
}

export default function TransItem({
    id, index, desc, payerId, amount, isHeader
}: TransItemProps) {
    const { persons, deleteTransaction } = useContext(DataContext) as DataContextProps;

    const handleDelete = () => {
        if (id && !isHeader) {
            console.log("deleting");
            deleteTransaction(id);
        }
    }

    return (
        <div 
            className={[
                "w-full flex gap-2 px-4 py-2",
                "dark:text-gray-100",
                isHeader ? "font-bold" : "border-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600",
            ].join(" ")}
        >
            <div className="w-[30px]">
                <span>{index !== undefined ? (typeof index === 'string' ? index : index.toString()) : ""}</span>
            </div>
            <div className="w-1/2">
                <span>{desc || ""}</span>
            </div>
            <div className={[
                "w-1/4 text-center",
                "hidden sm:block",
            ].join(" ")}>
                <span>{persons.find(p => p.id === payerId)?.name || ""}</span>
            </div>
            <div
                className={[
                    "w-1/4 text-right",
                ].join(" ")}
            >
                <span>{amount ? (typeof amount === 'string' ? amount : amount.toFixed(2)) : ""}</span>
            </div>
            <div className="w-[80px] flex items-center justify-end gap-2">
                {
                    isHeader ? <>
                    </> : <>
                        <Link to={`/gbill-react/trans/edit/${id}`}>
                            <IconButton
                                size="small"
                            >
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        </Link>
                        <IconButton
                            size="small"
                            onClick={handleDelete}
                        >
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                    </>
                }
            </div>
        </div>
    )
}