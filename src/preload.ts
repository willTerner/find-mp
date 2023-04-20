// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { API_KEY } from "./interface";


contextBridge.exposeInMainWorld(API_KEY.OPEN_DIRECTORY, () => {
   return ipcRenderer.invoke(API_KEY.OPEN_DIRECTORY); 
});

contextBridge.exposeInMainWorld(API_KEY.ANALYZE_SINGLE_PACKAGE, (packagePath: string) => {
   return ipcRenderer.invoke(API_KEY.ANALYZE_SINGLE_PACKAGE, packagePath);
});

contextBridge.exposeInMainWorld(API_KEY.READ_FILE_BY_LINE, (filePath: string, startLine: number, endLine: number) => {
   return ipcRenderer.invoke(API_KEY.READ_FILE_BY_LINE, filePath, startLine, endLine);
});

contextBridge.exposeInMainWorld(API_KEY.ANALYZE_DIRECTORY, (dirPath: string) => {
   return ipcRenderer.invoke(API_KEY.ANALYZE_DIRECTORY, dirPath);
});


