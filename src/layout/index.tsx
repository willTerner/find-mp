import { observer } from 'mobx-react'
import React from 'react'
import s from './index.module.scss'
import { Menu } from './menu'
import cx from 'classnames'
import { useUpdateDetectProgress, useUpdatePackageNumber } from '../hooks/useNotification'
import { PAGE_PARENT_ID } from '../constant'
import { Outlet } from 'react-router-dom'

export const Layout = observer(() => {
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
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
})
