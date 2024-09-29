import { HTMLAttributes, SyntheticEvent, useContext, useState } from "react";
import CircleButton from "@common/components/buttons/circleButton";

import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, FilterOptionsState, TextField, createFilterOptions } from "@mui/material";
import { DataContext, DataContextProps } from "@common/contexts/dataContext";
import IPerson from "@common/interfaces/interfacePerson";

const filter = createFilterOptions<IPerson>();

interface PayeeSelectProps {
    readonly?: boolean
    label?: string
    value?: IPerson
    onChange?: (newValue: IPerson|null) => void 
    onClose?: () => void,
}

export default function PersonSelect({ 
    readonly, label, value, onChange, onClose 
}: PayeeSelectProps) {
    const { persons } = useContext(DataContext) as DataContextProps;
    const [payee, setPayee] = useState<IPerson|null>(value || null);

    const payeeOptions: IPerson[] = persons;

    const handleClose = () => {
        onClose?.();
    }

    const handleChange = (_:SyntheticEvent, newValue: string|IPerson|null) => {
        console.log("changing", newValue)
        var newPayee = null;
        if (typeof newValue === 'string') {
            newPayee = {
                type: "person",
                id: "",
                name: newValue
            } as IPerson;
        } else if (newValue) {
            newPayee = newValue;
        }
        setPayee(newPayee);
        onChange?.(newPayee);
    }

    const handleFilterOptions = (options: IPerson[], params: FilterOptionsState<IPerson>) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                type: "person",
                id: "",
                name: inputValue
            });
        }

        return filtered;

    }

    // Handles how the selected option label is rendered
    const handleOptionLabel = (option: string|IPerson) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        // Add "xxx" option created dynamically
        if (option.id === "") {
            return option.name;
        }
        // Regular option
        return option.name;
    }

    // Handles how the option list items are rendered
    const handleRenderOption = (props: HTMLAttributes<HTMLLIElement>, option: IPerson) => {
        return <li {...props}>{option.id === "" ? `Add "${option.name}"` : option.name}</li>;
    }


    return (
        <div
            className="relative"
        >
            <div
                className={[
                    "peer w-fit min-w-[160px] max-w-[220px] transition-all",
                ].join(" ")}
            >
                <Autocomplete
                    readOnly={readonly}
                    disabled={readonly}
                    
                    value={payee}
                    onChange={handleChange}
                    filterOptions={handleFilterOptions}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={payeeOptions}
                    getOptionLabel={handleOptionLabel}
                    renderOption={handleRenderOption}
                    freeSolo
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label={label}
                            disabled={readonly}
                            InputLabelProps={{
                                shrink: readonly ? true : undefined
                            }}
                            InputProps={{
                                ...params.InputProps,
                                readOnly: readonly,
                                disabled: false
                            }}
                        />
                    )}
                />
            </div>
            {
                onClose ? (
                    <CircleButton
                        className={[
                            "absolute w-[16px] h-[16px] p-1 text-[8px] right-[-6px] top-[-6px] z-10",
                            "flex justify-center items-center opacity-0 [transition:opacity_0.5s]",
                            "peer-hover:opacity-100 hover:opacity-100",
                            "bg-gray-400 hover:bg-red-500 dark:hover:bg-red-500",
                        ].join(" ")}
                        onClick={handleClose}
                    >
                        <CloseIcon sx={{fontSize:"14px", color:"white"}}/>
                    </CircleButton>
                ) : null
            }
        </div>
    );
}