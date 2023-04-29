import { observer } from 'mobx-react'
import React, { type ReactNode } from 'react'
import s from './index.module.scss'
import { Menu } from './menu'
import cx from 'classnames'
import { useUpdateDetectProgress, useUpdatePackageNumber } from '../hooks/useNotification'
import { PAGE_PARENT_ID } from '../constant'

interface IProp {
    children: ReactNode
}

export const Layout = observer(({ children }: IProp) => {
    useUpdateDetectProgress()
    useUpdatePackageNumber()

    return (
        <div className={s.wrapper}>
            <div className={s.left}>
                <Menu></Menu>
            </div>
            <div className={s.right}>
                <div className={s.top}></div>
                <div className={cx(s.mainWrapper)} id={PAGE_PARENT_ID}>
                    {children}
                </div>
            </div>
        </div>
    )
})
