import { Spin } from "antd";
import { observer } from "mobx-react";
import React, { ReactNode } from "react";
import useStore from "../hooks/useStore";
import s from './index.module.scss';
import { Menu }  from "./menu";
import cx from 'classnames';
import Mask from "../component/Mask";
import { LoadingOutlined } from "@ant-design/icons";

interface IProp {
    children: ReactNode;
}

export const  Layout = observer(({ children }: IProp) => {
    const { isAnalyzing } = useStore();
    return (
        <div className={s.wrapper}>
            <div className={s.left}>
                <Menu></Menu>
            </div>
            <div className={s.right}>
                <div className={s.top}></div>
                <div className={cx(s.mainWrapper)}>
                    <Mask isHideMask={!isAnalyzing}>
                        <Spin indicator={<LoadingOutlined style={{ color: 'white' }}></LoadingOutlined>} size={"large"}></Spin>
                    </Mask>
                    {children}
                </div>
            </div>
        </div>
    )
});