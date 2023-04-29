import { message } from 'antd'
import { observer, Provider } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './layout'
import { Router } from './router'
import { PageStore } from './store'
import './highlightJs'

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
            <Layout>
                {contextHolder}
                <Router></Router>
            </Layout>
        </Provider>
    )
})

createRoot(document.querySelector('#main')).render(<App ></App>)
