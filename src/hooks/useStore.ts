import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { PageStore } from "../store";



export default function useStore()  {
    return useContext(MobXProviderContext).store as PageStore;
}