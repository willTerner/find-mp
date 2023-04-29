import { CloseCircleOutlined } from '@ant-design/icons'
import { type MessageInstance } from 'antd/es/message/interface'
import React from 'react'
import { v4 } from 'uuid'

export function pushClosableMessage (messageApi: MessageInstance, type: 'error' | 'info' | 'warning', message: string) {
    const key = v4()

    let color = 'red'

    if (type === 'info') {
        color = 'green'
    } else if (type === 'warning') {
        color = 'orange'
    }

    messageApi.open({
        type,
        content: message,
        duration: 0,
        icon: <CloseCircleOutlined color={color} onClick={() => { messageApi.destroy(key) }}></CloseCircleOutlined>,
        key
    })
}
