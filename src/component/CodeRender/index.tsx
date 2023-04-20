import React, { useEffect, useState } from "react";
import { API_KEY, BridgeWindow } from "../../interface";
import s from './index.module.scss';

interface IProp {
    filePath: string;
    startLine: number;
    endLine: number;
}

export default function CodeRender({filePath, startLine, endLine}: IProp) {
    const [code, setCode] = useState('');

    useEffect(() => {
        (window as unknown as BridgeWindow)[API_KEY.READ_FILE_BY_LINE](filePath, startLine, endLine).then(result => {
            if (result) {
                setCode(result);
            }
        });
    }, []);

    return (
        <pre className={s.pre}><code className={s.code}>{code}</code></pre>
    )
}