// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { API_KEY } from "./interface";

contextBridge.exposeInMainWorld(API_KEY.OPEN_DIRECTORY, () => {
   return ipcRenderer.invoke(API_KEY.OPEN_DIRECTORY); 
});
