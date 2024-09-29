import { Box, Modal, Stack } from "@mui/material";
import Button from "@src/common/components/buttons/button";
import { useAppDispatch } from "@src/common/hooks";
import PersonEditForm from "@src/features/person/components/PersonEditForm";
import PersonGroupBox from "@src/features/person/components/PersonGroupBox";
import type { Person } from "@src/features/person/interface";
import { addPerson, clearPersons } from "@src/features/person/slice";
import HomeSection from "@src/pages/home/components/HomeSection";
import { useState } from "react";


export default function GroupSection() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleOpenPersonForm = () => {
        setOpen(true);
    }

    const handleAddRequest = (newPerson: Person) => {
        dispatch(addPerson(newPerson));
        setOpen(false);
    }

    const handleAddCancel = () => {
        setOpen(false);
    }

    const handleAdd = () => {
        handleOpenPersonForm();
    }

    const handleClear = () => {
        dispatch(clearPersons());
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
            title="Group" 
            subtitle="Double click on the person box to edit/view details"
            buttons={actionButtons}
        >
            <Stack gap={2}>
                <PersonGroupBox />
            </Stack>
            <Modal
                open={open}
                aria-labelledby="modal-add-new-person"
                aria-describedby="Add a new person to the group"
            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <PersonEditForm onSubmit={handleAddRequest} onCancel={handleAddCancel}/>
                </Box>
            </Modal>
        </HomeSection>
    )
}