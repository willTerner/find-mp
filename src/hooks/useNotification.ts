import { Logger } from "../Logger";
import { API_KEY, BridgeWindow } from "../interface";
import useStore from "./useStore";


export function useUpdatePackageNumber() {
    const { setTotalPackageNumber } = useStore();
    
    (window as unknown as BridgeWindow)[API_KEY.UPDATE_PACKAGE_NUMBER]((e, total) => {
        Logger.info('receive total number from main progress ' + total);
        setTotalPackageNumber(total);
    });
}

export function useUpdateDetectProgress() {
    const { updateDetectProgress } = useStore();

    (window as unknown as BridgeWindow)[API_KEY.UPDATE_DETECT_PROGRESS](e => {
        Logger.info('receive update detect progress');
        updateDetectProgress();
    });
}