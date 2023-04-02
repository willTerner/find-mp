import { observer } from "mobx-react";
import React, { ReactNode } from "react";
import s from './index.module.scss';
import { Menu }  from "./menu";

interface IProp {
    children: ReactNode;
}

export const  Layout = observer(({ children }: IProp) => {
   
    return (
        <div className={s.wrapper}>
            <div className={s.left}>
                <Menu></Menu>
            </div>
            <div className={s.right}>
                <div className={s.top}></div>
                <div className={s.mainWrapper}>
                    <div className={s.main}>{children}</div>
                </div>
            </div>
        </div>
    )
});