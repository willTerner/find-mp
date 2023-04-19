import { observer } from "mobx-react";
import React from "react";
import useStore from "../../hooks/useStore";
import s from './index.module.scss';
import cx from 'classnames';
import { Record } from "../../interface";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
    key: string;
    featureName: string;
    featureNumber: number;
    detail: Record[];
}

export const ResultDetail = observer(() => {
    const { detectPackageResult } = useStore();

    if (!detectPackageResult) {
        return null;
    }

    const { success, metaData, packagePath, isMalicious, featurePosSet} = detectPackageResult;

    if (!success) {
        return null;
    }

    const columns : ColumnsType<DataType> = [
        {
            title: '特征名',
            dataIndex: 'featureName',
            key: 'featureName'
        },
        {
            title: '特征数量',
            dataIndex: 'featureNumber',
            key: 'featureNumber'
        },
    ];

    const dataSource: DataType[] = Object.entries(featurePosSet).map(([name, value]) => {
        return {
            key: name,
            featureName: name,
            featureNumber: value.length,
            detail: value,
        };
    });

    const getFileCode = (record: Record['content']) => {
        if (typeof record === 'string') {
            return record;
        }
        return `console.log('hello, world')`;
    }

    const renderDetial = (record: DataType) => {
        return record.detail.map(featurePosRecord => {
            return (
                <div>
                    {'文件路径: ' + featurePosRecord.filePath + '内容: '}
                    <pre><code>{getFileCode(featurePosRecord.content)}</code></pre>
                </div>
            )
        })
    };

    return (
        <div className={s.wrap}>
            <h2 className={s.packageName}>
                <span className={s.space}>包名</span>
                {metaData?.packageName}
            </h2>
            <div className={cx(s.line, s.firstLine)}>
                <div>
                    <span className={s.space}>版本: </span>
                    { metaData?.version }
                </div>
                <div>
                    <span className={s.space}>包大小: </span>
                    { metaData?.packageSize + ' ' }
                    字节
                </div>
                <div>
                    <span className={s.space}>是否是恶意包: </span>
                    { isMalicious ? '是' : '否'}
                </div>
            </div>
            <div className={cx(s.line, s.oneLine)}>
                <span className={s.space}>路径: </span>
                {packagePath}
            </div>
            <div className={s.dividerLine}></div>
            { 
                isMalicious && 
                <>
                    <h2>恶意特征位置</h2>
                    <Table 
                        columns={columns}
                        dataSource={dataSource}
                        expandable={
                            {
                                rowExpandable: (record) => record.featureNumber > 0,
                                expandedRowRender: renderDetial,
                            }
                        }
                        >
                    </Table>
                </>
            }
        </div>
    )
});