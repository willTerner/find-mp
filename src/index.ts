import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import { Logger } from './Logger';
import { API_KEY } from './interface';
import { analyzeDirectory, analyzeSinglePackage } from './api/detect';
import { readFileByLine } from './api/file';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		height: 730,
		width: 1000,
		webPreferences: {
		preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	const openDirectory = async() => {
		const result = await dialog.showOpenDialog({properties: ['openDirectory']});
		Logger.info('user choose directory: ' + result.filePaths.toString());
		return result.filePaths;
	};

	const analyze_single_package = async (e: IpcMainInvokeEvent, packagePath: string) => {
		return await analyzeSinglePackage(packagePath);
	};

	const read_file_by_line = async(e: IpcMainInvokeEvent, filePath: string, startLine: number, endLine: number) => {
		return await readFileByLine(filePath, startLine, endLine);
	};

	const analyze_directory = async(e: IpcMainInvokeEvent, dirPath: string) => {
		return await analyzeDirectory(dirPath, mainWindow.webContents);
	};

	ipcMain.handle(API_KEY.OPEN_DIRECTORY, openDirectory);

	ipcMain.handle(API_KEY.ANALYZE_SINGLE_PACKAGE, analyze_single_package);

	ipcMain.handle(API_KEY.READ_FILE_BY_LINE, read_file_by_line);

	ipcMain.handle(API_KEY.ANALYZE_DIRECTORY, analyze_directory);
  
	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	mainWindow.on('close', () => {
		Logger.info('window closed');
		ipcMain.removeHandler(API_KEY.OPEN_DIRECTORY);
		ipcMain.removeHandler(API_KEY.ANALYZE_SINGLE_PACKAGE);
		ipcMain.removeHandler(API_KEY.READ_FILE_BY_LINE);
		ipcMain.removeHandler(API_KEY.ANALYZE_DIRECTORY);
	})
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
