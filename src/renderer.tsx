import { message } from 'antd'
import { observer, Provider } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { PageStore } from './store'
import './highlightJs'
import { RouterProvider } from 'react-router-dom'

document.documentElement.style.fontSize = 100 * (document.documentElement.clientWidth || document.body.clientWidth) / 1442 + 'px'

const App = observer(() => {
    const [store] = useState(new PageStore())
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
        window.__store__ = store
    }, [])
    return (
        <Provider store={store} messageApi={messageApi}>
            {contextHolder}
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    )
})

createRoot(document.querySelector('#main')).render(<App ></App>)
