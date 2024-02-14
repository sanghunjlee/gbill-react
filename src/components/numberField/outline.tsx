import { Theme, useTheme } from "@mui/material";
import styled, { rootShouldForwardProp } from "@mui/material/styles/styled";


interface OutlineProps {
    label?: string
    notched: boolean
}

interface OwnerStateType {
    notched: boolean
}

const FieldSet = styled('fieldset', { shouldForwardProp: rootShouldForwardProp})(({
    theme, ownerState
}: { theme: Theme, ownerState: OwnerStateType }) => {
    return {
        textAlign: 'left',
        position: 'absolute',
        bottom: 0,
        right: 0,
        top: -5,
        left: 0,
        margin: 0,
        padding: '0 8px',
        pointerEvents: 'none',
        borderRadius: '4px',
        borderStyle: 'solid',
        borderWidth: 1,
        overflow: 'hidden',
        minWidth: '0%',
        borderColor: theme.palette.mode === 'light' ?  'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }
});

const Legend = styled('legend', { shouldForwardProp: rootShouldForwardProp })(({
    theme, ownerState
}: { theme: Theme, ownerState: OwnerStateType }) => ({
        float: 'unset', // Fix conflict with bootstrap
        width: 'auto', // Fix conflict with bootstrap
        overflow: 'hidden', // Fix Horizontal scroll when label too long
        display: 'block', // Fix conflict with normalize.css and sanitize.css
        padding: 0,
        height: 11, // sync with `lineHeight` in `legend` styles
        fontSize: '0.75em',
        visibility: 'hidden',
        maxWidth: 0.01,
        transition: theme.transitions.create('max-width', {
            duration: 50,
            easing: theme.transitions.easing.easeOut,
        }),
        whiteSpace: 'nowrap',
        '& > span': {
            paddingLeft: 5,
            paddingRight: 5,
            display: 'inline-block',
            opacity: 0,
            visibility: 'visible',
        },
        ...(ownerState.notched && {
            maxWidth: '100%',
            transition: theme.transitions.create('max-width', {
                duration: 100,
                easing: theme.transitions.easing.easeOut,
                delay: 50,
            }),
        }) 
    }),
);

export default function Outline({label, notched}: OutlineProps) {
    const ownerState: OwnerStateType = {
        notched
    };

    const theme = useTheme();

    return (
        <FieldSet ownerState={ownerState} theme={theme}>
            <Legend ownerState={ownerState} theme={theme}>
                <span>{label}</span>
            </Legend>
        </FieldSet>
    );
}