import { type MessageInstance } from 'antd/es/message/interface'
import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

export default function useMessageApi () {
    return useContext(MobXProviderContext).messageApi as MessageInstance
}
