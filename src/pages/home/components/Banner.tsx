import { Stack, Typography } from "@mui/material";

export default function Banner() {
    return (
        <div className="w-full">
            <div className="w-[800px] mx-auto">
                <Stack direction="row" spacing={2}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h3" gutterBottom>
                            Group Bills
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            Split Cost with Minimal Transactions
                        </Typography>
                        <Typography variant="h5">
                            
                        </Typography>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}