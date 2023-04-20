import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react";
import React from "react";
import useStore from "../../hooks/useStore";
import s from './index.module.scss';

interface DataType {
    key: string;
    packageName: string;
    filePath: string;
    success: '是' | '否';
    errorMessage: string;
    resultLink: '查看检测结果' | '';
}

export const  ResultList = observer(() => {
    const { resultList, dirPath } = useStore();
    const columns: ColumnsType<DataType> = [
        {
            key: 'packageName',
            title: '包名',
            dataIndex: 'packageName',
            width: '2rem',
        },
        {
            key: 'filePath',
            title: '包路径',
            dataIndex: 'filePath',
            width: '6rem',
        },
        {
            key: 'success',
            title: '检测是否成功',
            dataIndex: 'success',
            width: '2rem',
        },
        {
            key: 'resultLink',
            title: '结果链接',
            dataIndex: 'resultLink',
            width: '2rem',
        },
        {
            key: 'errorMessage',
            dataIndex: 'errorMessage',
            title: '错误信息',
            width: '4rem'
        },
    ];

    const dataSource: DataType[] = resultList.map(result => {
        
        const parseErrorMessage = (errorMessage: any) => {
            const message = JSON.parse(errorMessage);
            if (typeof message === 'string') {
                return message;
            }
            return `error name: ${message.name}\nerror message: ${message.message}`
        };

        return {
            key: result.packagePath,
            packageName: result.metaData.packageName,
            filePath: result.packagePath,
            success: result.success ? '是' : '否',
            resultLink: result.success ? '查看检测结果' : '',
            errorMessage: result.errorMessage ? parseErrorMessage(result.errorMessage) : '',
        };
    })

    if (!Array.isArray(resultList)) {
        return null;
    }

    return (
        <div className={s.wrap}>
            <div style={{ marginBottom: "0.3rem" , alignItems: 'center', display: 'flex' }}>
                <span className={s.highlight}>检测目录: </span>
                <Tooltip title={dirPath}><div className={s.pathText}>{dirPath}</div></Tooltip>
            </div>
            <Table columns={columns} dataSource={dataSource} scroll={{ x: '16rem'}}></Table>
        </div>
    )
});