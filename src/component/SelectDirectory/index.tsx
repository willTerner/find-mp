import { Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { API_KEY, type BridgeWindow } from '@interface'
import s from './index.module.scss'
import { ContainerOutlined } from '@ant-design/icons'

interface IProp {
    onSelectFile: (filePath: string) => void
    uploadText?: string
}

export const SelectDirectory = observer(({ onSelectFile, uploadText = '点击上传' }: IProp) => {
    const [filePath, setFilePath] = useState<string>(undefined)

    const selectDirectory = async () => {
        const filePaths = await (window as unknown as BridgeWindow)[API_KEY.OPEN_DIRECTORY]()
        if (filePaths.length > 0) {
            setFilePath(filePaths[0])
            onSelectFile(filePaths[0])
        }
    }

    return (
        <div className={s.container}>
            <div className={s.selectWrap} onClick={selectDirectory}>
                <ContainerOutlined style={{ fontSize: '0.48rem', marginBottom: '0.2rem' }}></ContainerOutlined>
                <span >{uploadText}</span>
                { filePath && <Tooltip title={filePath}><span className={s.fileDesc}>选择的目录: {filePath}</span></Tooltip>}
            </div>
        </div>
    )
})
