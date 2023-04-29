import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { type PageStore } from '@store/index'

export default function useStore () {
    return useContext(MobXProviderContext).store as PageStore
}
