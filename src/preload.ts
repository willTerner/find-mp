// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import { API_KEY } from './interface'

contextBridge.exposeInMainWorld(API_KEY.OPEN_DIRECTORY, async () => {
    return await ipcRenderer.invoke(API_KEY.OPEN_DIRECTORY)
})

contextBridge.exposeInMainWorld(API_KEY.ANALYZE_SINGLE_PACKAGE, async (packagePath: string) => {
    return await ipcRenderer.invoke(API_KEY.ANALYZE_SINGLE_PACKAGE, packagePath)
})

contextBridge.exposeInMainWorld(API_KEY.READ_FILE_BY_LINE, async (filePath: string, startLine: number, endLine: number) => {
    return await ipcRenderer.invoke(API_KEY.READ_FILE_BY_LINE, filePath, startLine, endLine)
})

contextBridge.exposeInMainWorld(API_KEY.ANALYZE_DIRECTORY, async (dirPath: string) => {
    return await ipcRenderer.invoke(API_KEY.ANALYZE_DIRECTORY, dirPath)
})

contextBridge.exposeInMainWorld(API_KEY.UPDATE_PACKAGE_NUMBER, (callback: any) => {
    ipcRenderer.on(API_KEY.UPDATE_PACKAGE_NUMBER, callback)
})

contextBridge.exposeInMainWorld(API_KEY.UPDATE_DETECT_PROGRESS, (callback: any) => {
    ipcRenderer.on(API_KEY.UPDATE_DETECT_PROGRESS, callback)
})
