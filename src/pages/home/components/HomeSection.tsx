import { Typography } from "@mui/material";
import type { ComponentProps, ReactNode } from "react";

interface HomeSectionProps extends ComponentProps<"div"> {
    title?: string,
    subtitle?: string,
    width?: number,
    buttons?: JSX.Element | ReactNode
}

export default function HomeSection(props: HomeSectionProps) {
    const {
        title,
        subtitle,
        width = 800,
        buttons,
        children
    } = props;

    return (
        <div className="w-full">
            <div className={`w-[${width}px] mx-auto`}>
                {title ? (
                    <div className="w-full flex justify-between items-center">
                        <Typography variant="h4">
                            {title}
                        </Typography>
                        <div>
                            {buttons}
                        </div>
                    </div>
                ) : null}
                {subtitle ? (
                    <Typography variant="caption">
                        {subtitle}
                    </Typography>
                ) : null}
                <div className="w-full p-2">
                    {children}
                </div>
            </div>
        </div>
    )
}