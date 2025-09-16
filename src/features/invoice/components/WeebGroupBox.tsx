import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import WeebBox from "@src/features/invoice/components/WeebBox";
import { Weeb } from "@src/features/invoice/interface";
import { useMemo } from "react";

interface WeebGroupBoxProps extends BoxProps {
    weebs: Weeb[]
}

export default function WeebGroupBox(props: WeebGroupBoxProps) {
    const {
        weebs
    } = props;

    const theme = useTheme();

    const legend = useMemo(() => ([
        { color: theme.palette.primary.main, title: "Profit", desc: "Total amount to collect" },
        { color: theme.palette.error.main, title: "Debt", desc: "Total amount to pay" }
    ]), [theme]);

    return (
        <Box>
            <div className="w-full p-4">
                <ul className="w-full flex justify-evenly">
                    {legend.map((lg, i) => ( 
                        <li key={i}>
                            <div className="inline-flex gap-[1ch]">
                                <div
                                    className={[
                                        `w-6 h-6 rounded-md border-[1px] flex items-center justify-center`
                                    ].join(" ")}
                                    style={{borderColor: lg.color, color: lg.color}}
                                >
                                    <span className="leading-4 text-[11px] font-bold">
                                        $
                                    </span>
                                </div>
                                <div className="inline-flex gap-1">
                                    <span className="font-medium after:content-[':']">
                                        {lg.title}
                                    </span>
                                    <span>
                                        {lg.desc}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <ul className="w-full p-4 flex justify-center gap-4">
                {weebs.map((w,i) => (
                    <li key={i}>
                        <WeebBox weeb={w} />
                    </li>
                ))}
            </ul>
        </Box>
    )
}