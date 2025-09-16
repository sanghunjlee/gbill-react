import { Modal, Box, Stack } from "@mui/material";
import Button from "@src/common/components/buttons/button";
import { useAppDispatch } from "@src/common/hooks";
import BillForm from "@src/features/bill/components/BillForm";
import BillList from "@src/features/bill/components/BillList";
import type { Bill } from "@src/features/bill/interface";
import { clearBills, createBill } from "@src/features/bill/slice";
import HomeSection from "@src/pages/home/components/HomeSection";
import { useState } from "react";

export default function BillSection() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleAddSubmit = (newBill: Bill) => {
        console.log(newBill);
        dispatch(createBill(newBill));
        setOpen(false);
    }

    const handleAddCancel = () => {
        setOpen(false);
    }

    const handleAdd = () => {
        handleModalOpen();
    }

    const handleClear = () => {
        dispatch(clearBills());
    }

    const actionButtons = (
        <Stack direction="row" gap={2}>
            <Button onClick={handleAdd}>
                Add
            </Button>
            <Button onClick={handleClear}>
                Clear
            </Button>
        </Stack>
    );

    return (
        <HomeSection 
            title="Bills"
            buttons={actionButtons}
        >
            <Stack gap={2}>
                <BillList />
            </Stack>
            <Modal
                open={open}
                aria-labelledby="modal-add-new-bill"
                aria-describedby="Add a new bill"
            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        maxHeight: "90vh",
                        overflowY: "auto",
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <BillForm onSubmit={handleAddSubmit} onCancel={handleAddCancel}/>
                </Box>
            </Modal>
        </HomeSection>
    )
}