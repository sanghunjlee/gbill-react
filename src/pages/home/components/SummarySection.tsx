import { Stack } from "@mui/material";
import { currencyToString } from "@src/common/helpers/currencyHelper";
import { useAppDispatch, useAppSelector } from "@src/common/hooks";
import { selectBillsCount, selectBillsAmount, selectBills } from "@src/features/bill/slice";
import WeebGroupBox from "@src/features/invoice/components/WeebGroupBox";
import { getInvoices, getRadarInvoices, getRadarWeebs, optimizeInvoices } from "@src/features/invoice/helper";
import { selectPersonById, selectPersons } from "@src/features/person/slice";
import HomeSection from "@src/pages/home/components/HomeSection";
import { useEffect, useMemo, useRef, useState } from "react";

interface TextArrowProps {
    width?: number;
    headWidth?: number;
    height?: number;
    text: string;
}

function TextArrow(props: TextArrowProps) {
    const {
        width,
        headWidth = 20,
        height = 40,
        text
    } = props;
    const rootRef = useRef<HTMLDivElement>(null);
    const [tailWidth, setTailWidth] = useState(width ? width-headWidth : 40);

    useEffect(() => {
        if (rootRef.current && width === undefined) {
            setTailWidth(rootRef.current.clientWidth - headWidth);
        }
    }, [rootRef.current]);

    return (
        <div
            ref={rootRef}
            className="relative"
            style={{
                width: width ?? "auto"
            }}
        >
            <svg viewBox={`0 0 ${tailWidth+headWidth} ${height}`}>
                <path fill="none" stroke="black"
                    d={`M 10,${height-10}
                        L ${tailWidth},${height-10} 
                        L ${tailWidth},${height} 
                        L ${tailWidth+headWidth},${height/2} 
                        L ${tailWidth},0 
                        L ${tailWidth},10 
                        L 10,10 
                        L 10,${height-10}`}
                />
            </svg>
            <div className="absolute inset-0 flex justify-center items-center">
                <span className="">
                    {text}
                </span>
            </div>
        </div>
    )
}


export default function SummarySection() {
    const invoiceListRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const bills = useAppSelector(selectBills);
    const persons = useAppSelector(selectPersons);
    const billsCount = useAppSelector(selectBillsCount);
    const totalAmount = useAppSelector(selectBillsAmount);
    const [arrowWidth, setArrowWidth] = useState(40);

    const getPersonById = (personId: string) => persons.find(p => p.id === personId);

    const weebs = getRadarWeebs(bills);
    const radarized = getRadarInvoices(weebs);

    useEffect(() => {
        if (invoiceListRef.current) {
            const width = 0.33 * invoiceListRef.current.clientWidth;
            setArrowWidth(Math.max(120, width));
        }
    }, [invoiceListRef.current]);

    return (
        <HomeSection 
            title="Summary"
        >
            <Stack gap={2}>
                <div>
                    Total number of bills: {billsCount}
                </div>
                <div>
                    Total amount: {currencyToString(totalAmount)}
                </div>
                <WeebGroupBox weebs={weebs} />
                <div ref={invoiceListRef} >
                    <ul>
                        {radarized.map((inv, i) => (
                            <li key={i}>
                                <div className="w-full flex items-center gap-4">
                                    <div>
                                        {getPersonById(inv.fromId)?.name}
                                    </div>
                                    <div className="flex-auto">
                                        <TextArrow text={currencyToString(inv.amount)} height={48} headWidth={48}/>
                                    </div>
                                    <div>
                                        {getPersonById(inv.toId)?.name}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Stack>
        </HomeSection>
    )
}