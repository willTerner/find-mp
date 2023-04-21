import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => V) {
    const lock = useRef(false);

    return async (...args: P) => {
        if (lock.current) {
            return ;
        }
        lock.current = true;
        try{
            const res = await fn(...args);
            lock.current = false;
            return res;
        } catch(error) {
            lock.current = false;
            throw error;
        }
    }
}