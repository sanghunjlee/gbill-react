import { Box, useTheme } from "@mui/material";
import IPerson from "@src/interfaces/interfacePerson";

interface PersonBoxProps extends Partial<IPerson> {

}

export default function PersonBox({
    name
}: PersonBoxProps) {
    return (
        <Box
            component={"div"}
            sx={{
                px: 2,
                py: 1,
                borderRadius: "0.5rem",
                border: "2px solid",
                borderColor: "primary.main",
                fontWeight: "500",
            }}
        >
            {name || ""}
        </Box>
    )
}