import * as React from 'react';
import Typography from '@mui/material/Typography';

interface ITitleProps {
    children?: React.ReactNode;
}

export const Title: React.FC<ITitleProps> = (props) => {
    return (
        <Typography variant="h3" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}