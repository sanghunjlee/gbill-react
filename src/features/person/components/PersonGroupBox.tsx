import { Box, Modal, type ModalProps } from "@mui/material";
import CenteredModal from "@src/common/components/CenteredModal";
import { useAppDispatch, useAppSelector } from "@src/common/hooks";
import PersonBox from "@src/features/person/components/PersonBox";
import PersonEditForm from "@src/features/person/components/PersonEditForm";
import type { Person } from "@src/features/person/interface";
import { editPerson } from "@src/features/person/slice";
import { useState, type FormEvent } from "react";


export default function PersonGroupBox() {
    const dispatch = useAppDispatch();
    const persons = useAppSelector(state => state.person.persons);

    const [selected, setSelected] = useState<Person|undefined>();
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = function(person: Person) {
        setSelected(person);
        setModalOpen(true);
    }

    const handleModalClose = function() {
        setModalOpen(false);
    }

    const handleEditRequest = function(newPerson: Person) {
        dispatch(editPerson(newPerson));
    }

    return (
        <>
            <Box>
                <ul className="flex justify-center items-center gap-2">
                    {persons.map((p, i) => (
                        <PersonBox key={i} person={p} onDblClicked={() => handleModalOpen(p)}/>
                    ))}
                </ul>
            </Box>
        
            {selected ? (
                <CenteredModal
                    open={modalOpen}
                    onClose={handleModalClose}
                >

                    <PersonEditForm person={selected} onSubmit={handleEditRequest} onCancel={handleModalClose}/>
                </CenteredModal>
            ) : null}
        </>
    )
}