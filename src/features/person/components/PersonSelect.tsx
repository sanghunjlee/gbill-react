import { FormControl, InputLabel, MenuItem, Select, useControlled, type FormControlProps, type SelectChangeEvent } from "@mui/material";
import { useAppSelector } from "@src/common/hooks";
import type { Person } from "@src/features/person/interface";
import { useId, useRef, useState } from "react";

interface PersonSelectProps extends Omit<FormControlProps, "onChange"> {
    label?: string;
    value?: Person;
    onChange?: (value: Person) => void;
}

export default function PersonSelect(props: PersonSelectProps) {
    const {
        label,
        value: valueProp,
        onChange,
        ...otherProps
    } = props;

    const persons = useAppSelector(state => state.person.persons);
    const id = useId();
    
    const [value, setValue] = useState(valueProp);

    const handleChange = function(event: SelectChangeEvent) {
        const person = persons.find(p => p.id === event.target.value);
        if (person) {
            onChange?.(person);
            setValue(person);
        }
    }

    return (
        <FormControl
            {...otherProps}
        >
            <InputLabel 
                id={id+"-person-select-input-label"}
            >
                {label}
            </InputLabel>
            <Select
                id={id+"person-select-input"}
                labelId={id+"person-select-input-label"}
                value={value?.id || ""}
                label={label}
                onChange={handleChange}
            >
                {persons.map((p,i) => (
                    <MenuItem
                        key={i}
                        value={p.id}
                    >
                        {p.name}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );
}