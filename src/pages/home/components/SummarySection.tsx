import { Stack } from "@mui/material";
import { currencyToString } from "@src/common/helpers/currencyHelper";
import { useAppDispatch, useAppSelector } from "@src/common/hooks";
import { selectBillsCount, selectBillsAmount, selectBills } from "@src/features/bill/slice";
import { getInvoices, getRadarInvoices, optimizeInvoices } from "@src/features/invoice/helper";
import { selectPersonById, selectPersons } from "@src/features/person/slice";
import HomeSection from "@src/pages/home/components/HomeSection";


export default function SummarySection() {
    const dispatch = useAppDispatch();
    const bills = useAppSelector(selectBills);
    const persons = useAppSelector(selectPersons);
    const billsCount = useAppSelector(selectBillsCount);
    const totalAmount = useAppSelector(selectBillsAmount);

    const getPersonById = (personId: string) => persons.find(p => p.id === personId);

    const invoices = getInvoices(bills);
    const optimized = optimizeInvoices(invoices);
    const radarized = getRadarInvoices(bills);

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
                <div>
                    <ul>
                        {invoices.map((inv, i) => (
                            <li key={i}>
                                <div className="w-full grid grid-cols-3 gap-x-2">
                                    <div>
                                        To:
                                        {getPersonById(inv.toId)?.name}
                                    </div>
                                    <div>
                                        From:
                                        {getPersonById(inv.fromId)?.name}
                                    </div>
                                    <div>
                                        Amount:
                                        {currencyToString(inv.amount)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul>
                        {optimized.map((inv, i) => (
                            <li key={i}>
                                <div className="w-full grid grid-cols-3 gap-x-2">
                                    <div>
                                        To:
                                        {getPersonById(inv.toId)?.name}
                                    </div>
                                    <div>
                                        From:
                                        {getPersonById(inv.fromId)?.name}
                                    </div>
                                    <div>
                                        Amount:
                                        {currencyToString(inv.amount)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul>
                        {radarized.map((inv, i) => (
                            <li key={i}>
                                <div className="w-full grid grid-cols-3 gap-x-2">
                                    <div>
                                        To:
                                        {getPersonById(inv.toId)?.name}
                                    </div>
                                    <div>
                                        From:
                                        {getPersonById(inv.fromId)?.name}
                                    </div>
                                    <div>
                                        Amount:
                                        {currencyToString(inv.amount)}
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