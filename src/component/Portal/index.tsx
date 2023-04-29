import type React from 'react'
import { createPortal } from 'react-dom'

interface IProp {
    children: React.ReactNode
    parentContainer?: HTMLElement
    isShowPortal: boolean
}

export default function Portal (props: IProp) {
    const { children, parentContainer = document.body, isShowPortal } = props

    if (!isShowPortal) {
        return null
    }

    return createPortal(children, parentContainer)
}
