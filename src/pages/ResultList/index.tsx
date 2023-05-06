import { Button, Table, Tooltip } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { observer } from 'mobx-react'
import React from 'react'
import useStore from '@hooks/useStore'
import s from './index.module.scss'
import { PagePath, type DetectPackageResult } from '@interface'
import { v4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

interface DataType {
    key: string
    packageName: string
    filePath: string
    success: boolean
    errorMessage: string
    resultLink: '查看检测结果'
    detectResult: DetectPackageResult
}

export const ResultList = observer(() => {
    const { resultList, dirPath, setDetectPackageResult } = useStore()
    const navigate = useNavigate()
    const onClickResult = (record: DataType) => {
        if (!record.success) {
            return
        }
        setDetectPackageResult(record.detectResult)
        navigate(PagePath.RESULT_DETAIL)
    }

    if (!Array.isArray(resultList)) {
        return null
    }

    const columns: ColumnsType<DataType> = [
        {
            key: 'packageName',
            title: '包名',
            dataIndex: 'packageName',
            width: '2rem'
        },
        {
            key: 'filePath',
            title: '包路径',
            dataIndex: 'filePath',
            width: '6rem'
        },
        {
            key: 'success',
            title: '检测是否成功',
            dataIndex: 'success',
            width: '2.3rem',
            render (value, record) {
                if (record.success) {
                    return '是'
                }
                return '否'
            }
        },
        {
            key: 'resultLink',
            title: '结果链接',
            dataIndex: 'resultLink',
            width: '2rem',
            render (text, record) {
                return <Button disabled={!record.success} type={'link'} onClick={() => { onClickResult(record) }}>{text}</Button>
            }
        },
        {
            key: 'errorMessage',
            dataIndex: 'errorMessage',
            title: '错误信息',
            width: '4rem'
        }
    ]

    const dataSource: DataType[] = resultList.map(result => {
        const parseErrorMessage = (errorMessage: any) => {
            const message = JSON.parse(errorMessage)
            if (typeof message === 'string') {
                return message
            }
            return `error name: ${message.name}\nerror message: ${message.message}`
        }

        return {
            key: result.packagePath + v4(),
            packageName: result.metaData?.packageName || '',
            filePath: result.packagePath,
            success: result.success,
            resultLink: '查看检测结果',
            errorMessage: result.errorMessage ? parseErrorMessage(result.errorMessage) : '',
            detectResult: result
        }
    })

    return (
        <div className={s.wrap}>
            <div style={{ marginBottom: '0.3rem', alignItems: 'center', display: 'flex' }}>
                <span className={s.highlight}>检测目录: </span>
                <Tooltip title={dirPath}><div className={s.pathText}>{dirPath}</div></Tooltip>
            </div>
            <Table columns={columns} dataSource={dataSource} scroll={{ x: '16.3rem' }}></Table>
        </div>
    )
})
