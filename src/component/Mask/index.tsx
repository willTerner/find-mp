import React from "react";
import s from './index.module.scss';

interface IProp {
    isHideMask?: boolean;
    children?: React.ReactNode;
}


export default function Mask(props: IProp) {
    const { isHideMask = false, children } = props;
    
    if (isHideMask) {
        return null;
    }

    return (
        <div className={s.mask}>
            {children}
        </div>
    )
}