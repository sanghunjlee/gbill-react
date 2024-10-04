import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import CenteredModal from "@src/common/components/CenteredModal";
import { useAppDispatch, useAppSelector } from "@src/common/hooks";
import BillBox from "@src/features/bill/components/BillBox";
import BillForm from "@src/features/bill/components/BillForm";
import BillListItem from "@src/features/bill/components/BillListItem";
import type { Bill } from "@src/features/bill/interface";
import { editBill, removeBill, selectBills } from "@src/features/bill/slice";
import { useState } from "react";

export default function BillList() {
    const dispatch = useAppDispatch();
    const bills = useAppSelector(selectBills);

    const [selected, setSelected] = useState<Bill|undefined>();
    const [modalOpen, setModalOpen] = useState(false);

    
    const handleModalOpen = function() {
        setModalOpen(true);
    }

    const handleModalClose = function() {
        setModalOpen(false);
    }

    const handleBoxClick = function(clicked: Bill) {
        setSelected(clicked);
        handleModalOpen();
    }

    const handleEditRequest = function(newBill: Bill) {
        dispatch(editBill(newBill));
        handleModalClose();
    }

    const handleDeleteRequest = function(bill: Bill) {
        dispatch(removeBill(bill.id));
        handleModalClose();
    }

    return (
        <>
            <List>
                {bills.map((b, i) => (
                    <ListItem key={i}>
                        <BillBox 
                            item={b} 
                            onClick={() => handleBoxClick(b)}
                            sx={{cursor: "pointer"}}
                        />
                    </ListItem>
                ))}
            </List>
            
            {selected ? (
                <CenteredModal
                    width={800}
                    open={modalOpen}
                >

                    <BillForm bill={selected} onSubmit={handleEditRequest} onCancel={handleModalClose} onDelete={handleDeleteRequest}/>
                </CenteredModal>
            ) : null}
        </>
    )
}