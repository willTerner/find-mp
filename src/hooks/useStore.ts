import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";

export default function useStore<T>(): T {
    const { store } = useContext(MobXProviderContext);
    return store;
}