import React, { ReactNode } from "react";
import s from './index.module.scss';

interface IProp {
    children: ReactNode;
}

export default function Layout({ children }: IProp) {
    return (
        <div className={s.wrapper}>
            <div className={s.left}></div>
            <div className={s.right}>
                <div className={s.top}></div>
                <div className={s.mainWrapper}>
                    <div className={s.main}>{children}</div>
                </div>
            </div>
        </div>
    )
}