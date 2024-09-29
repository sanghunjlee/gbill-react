import { type ModalProps, Modal, Box } from "@mui/material";

interface CenteredModalProps extends ModalProps {

}

export default function CenteredModal(props: CenteredModalProps) {
    const {
        open,
        onClose,
        children,
        ...otherProps
    } = props;

    return (
        <Modal
            open={open}
            onClose={onClose}
            {...otherProps}
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
                {children}
            </Box>
        </Modal>
    )
}