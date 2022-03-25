import React from 'react';
import { Button } from "@mui/material";

interface IProps {
    setToggle?: () => void
}

export const EditFormWrapper: React.FC<IProps> = ({ setToggle, children }) => {
    
    return (
        <div className='app__flex'>
            <Button
                color={'error'}
                onClick={setToggle}
                style={{ alignSelf: "end" }}
            >
                Cancel
            </Button>
            {children}
        </div>
    );
};

