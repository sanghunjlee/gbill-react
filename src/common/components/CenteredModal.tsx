import { type ModalProps, Modal, Box } from "@mui/material";

interface CenteredModalProps extends ModalProps {
    width?: string | number;
}

export default function CenteredModal(props: CenteredModalProps) {
    const {
        width: widthProp = 400,

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
                    width: widthProp,
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