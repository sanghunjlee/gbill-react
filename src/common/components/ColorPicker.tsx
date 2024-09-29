import { MenuItem } from "@mui/material";
import Select, {type SelectProps, type SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface ColorPickerProps extends Omit<SelectProps, "value" | "onChange"> {
    value?: string;
    onChange?: (event: SelectChangeEvent<unknown>) => void;
}

export default function ColorPicker(props: ColorPickerProps) {
    const {
        variant,
        value: valueProp = "black",
        onChange,
        ...selectProps
    } = props;

    const [value, setValue] = useState<string>(valueProp);

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setValue(event.target.value as string);
        onChange?.(event);
    }

    const availableColors = [
        "red",
        "blue",
        "green",
        "gray",
        "black"
    ]

    return (
        <Select
            variant={variant}
            type="string"
            value={value}
            onChange={handleChange}
            {...selectProps}
        >
            {availableColors.map((color, index) => (
                <MenuItem key={index} value={color} sx={{ color }}>
                    {color}
                </MenuItem>
            ))}
        </Select>
    )
}