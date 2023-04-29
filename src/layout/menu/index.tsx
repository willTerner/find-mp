import React from 'react'
import s from './index.module.scss'
import hackerImg from '../../imgs/security.png'
import { CopyFilled, ProfileFilled, FileFilled, DatabaseFilled } from '@ant-design/icons'
import { observer } from 'mobx-react'
import useStore from '../../hooks/useStore'
import { PageName } from '../../store'

export const Menu = observer(() => {
    const { setPageName } = useStore()

    return (
        <div className={s.wrapper}>
            <div className={s.logoWrapper}>
                <img src={hackerImg} className={s.logo}></img>
                <span className={s.name}>FindMP</span>
            </div>
            <div className={s.item} onClick={() => { setPageName(PageName.DETECT_SINGLE_PACKAGE) }}>
                <CopyFilled className={s.space}></CopyFilled>
                <span>检测单个包</span>
            </div>
            <div className={s.item} onClick={() => { setPageName(PageName.DETECT_DIRECTORY) }}>
                <ProfileFilled className={s.space}></ProfileFilled>
                <span>检测目录</span>
            </div>
            <div className={s.item} onClick={() => { setPageName(PageName.RESULT_DETAIL) }}>
                <FileFilled className={s.space}></FileFilled>
                <span>检测结果</span>
            </div>
            <div className={s.item} onClick={() => { setPageName(PageName.RESULT_LIST) }}>
                <DatabaseFilled className={s.space}></DatabaseFilled>
                <span>检测结果列表</span>
            </div>
        </div>
    )
})
