export interface BridgeWindow extends Window {
    openDirectory: () => Promise<string[]>,
}


export enum API_KEY {
    OPEN_DIRECTORY = 'openDirectory',
}