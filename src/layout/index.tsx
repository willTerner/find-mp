import React, { ReactNode } from "react";
import './index.css';

interface IProp {
    children: ReactNode;
}

export default function Layout({ children }: IProp) {
    return (
        <div className='wrapper'>
            <div className='left'></div>
            <div className='right'>
                <div className='top'></div>
                <div className='mainWrapper'>
                    <div className='main'>{children}</div>
                </div>
            </div>
        </div>
    )
}