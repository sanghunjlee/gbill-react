import { TextField, TextFieldProps } from "@mui/material";


// const NumberInput = forwardRef<HTMLDivElement>(function NumberInput(
//     props: NumberInputProps,
//     ref: ForwardedRef<HTMLDivElement>,
// ) {
//     return (
//         <BaseNumberInput
//             {...props}
//             ref={ref}
//         />
//     )
// })

interface NumberFieldProps extends Omit<TextFieldProps, "type"|"placeholder"|"variant"|"label"> {}

export default function NumberField(props: NumberFieldProps) {
    // const id = useId();
    // const [isFocus, setFocus] = useState(false);

    // const OutlinedFormGroup = styled(FormGroup)(({theme}) => {
    //     return {
    //         position: 'relative',
    //         borderRadius: theme.shape.borderRadius,
    //         [`&:hover`]: {
    //             borderColor: theme.palette.text.primary
    //         },
    //         [`&:focused`]: {
    //             borderColor: theme.palette.primary.main,
    //             borderWidth: 2
    //         }
    //     }
    // })

    return (
        <TextField 
            type="number"
            placeholder="0.00"
            variant="outlined"
            label="Amount"
            {...props}
        />
    )

    // return (
    //     <FormControl>
    //         <InputLabel>
    //             Number
    //         </InputLabel>
    //         <OutlinedInput 
    //             slots={{
    //                 input: NumberInput
    //             }}
    //             slotProps={{
    //                 input: {
    //                     placeholder: "0.00",
    //                     step: 0.01,
    //                     min: 0
    //                 }
    //             }}  
    //             value={amount}
    //             label="Number"
    //         />
    //     </FormControl>
    // )
    // return (
    //     <FormControl>
    //         <InputLabel
    //             htmlFor={id}
    //             id={`${id}-label`}
    //         >
    //             Number
    //         </InputLabel>
    //         <OutlinedFormGroup 
    //             row
    //             onFocus={() => setFocus(true)}
    //             onBlur={() => setFocus(false)}
    //         >
                
    //             <Outline label="Number" notched={isFocus} />
    //         </OutlinedFormGroup>
            
    //     </FormControl>
    // );
}