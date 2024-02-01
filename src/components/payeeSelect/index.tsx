import { ComponentProps, useState } from "react";
import Person from "../../interfaces/interfacePerson";
import CircleButton from "../buttons/circleButton";
import Select from "../select";
import { getPersons } from "../../utils/services/persons";

import CloseIcon from '@mui/icons-material/Close';

interface PayeeSelectProps {
    index: number,
    value?: Person,
    onChange: (index: number, newPayee: Person) => void,
    onClose: () => void,
}

export default function PayeeSelect({ index, value, onChange, onClose }: PayeeSelectProps) {
    const [selected, setSelected] = useState<Person | undefined>(value);
    const [options, setOptions] = useState<Array<Person>>(getPersons());

    const handleClose = () => {
        onClose();
    }
    const handleSelectChange = (newIndex: number) => {
        setSelected(options[newIndex]);
        onChange(index, options[newIndex]);
    }

    return (
        <div
            className="relative"
        >
            <div
                className={[
                    "peer w-fit min-w-[80px] max-w-[220px] h-[44px] p-2 border-2 rounded-lg transition-all",
                    "dark:border-gray-500",
                    "hover:scale-105",
                ].join(" ")}
            >
                <Select 
                    options={options.map(p => p.name)}
                    selectedIndex={options.findIndex(p => selected ? p.id === selected.id : null)}
                    onChange={handleSelectChange}
                />
            </div>
            <CircleButton
                className={[
                    "absolute w-[16px] h-[16px] p-1 text-[8px] right-[-6px] top-[-6px] z-10",
                    "flex justify-center items-center opacity-0 [transition:opacity_0.5s]",
                    "peer-hover:opacity-100 hover:opacity-100",
                    "bg-gray-400 hover:bg-red-500 dark:hover:bg-red-500",
                ].join(" ")}
                onClick={handleClose}
            >
                <CloseIcon className="text-white font-bold" />
            </CircleButton>
        </div>
    );
}