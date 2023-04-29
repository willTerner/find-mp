import React, { useEffect, useState } from 'react'
import { API_KEY, type BridgeWindow } from '@interface'

interface IProp {
    filePath: string
    startLine: number
    endLine: number
}

export default function CodeRender ({ filePath, startLine, endLine }: IProp) {
    const [code, setCode] = useState('')

    useEffect(() => {
        (window as unknown as BridgeWindow)[API_KEY.READ_FILE_BY_LINE](filePath, startLine, endLine).then(result => {
            if (result) {
                setCode(result)
            }
        })
    }, [])

    return <>{code}</>
}
