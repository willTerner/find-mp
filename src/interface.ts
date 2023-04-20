export interface BridgeWindow extends Window {
    [API_KEY.OPEN_DIRECTORY]: () => Promise<string[]>,
    [API_KEY.ANALYZE_SINGLE_PACKAGE]: (packagePath: string) => Promise<DetectPackageResult>,
    [API_KEY.READ_FILE_BY_LINE]: (filePath: string, startLine: number, endLine: number) => Promise<string | undefined>,
}


export enum API_KEY {
    OPEN_DIRECTORY = 'openDirectory',
    ANALYZE_SINGLE_PACKAGE = 'analyzeSinglePackage',
    READ_FILE_BY_LINE = 'readFileByLine',
}

export type Record = {
    filePath: string;
    content: {
       start: {
          line: number;
          column: number;
       },
       end: {
          line: number;
          column: number;
       },
    } | string;
 }

 export interface PackageFeatureInfo {
    hasInstallScripts: boolean;
    containIP: boolean;
    useBase64Conversion: boolean;
    useBase64ConversionInInstallScript: boolean;
    containBase64StringInJSFile: boolean;
    containBase64StringInInstallScript: boolean;
    containDomainInJSFile: boolean;
    containDomainInInstallScript: boolean;
    containBytestring: boolean;
    useBuffer: boolean;
    useEval: boolean;
    requireChildProcessInJSFile: boolean;
    requireChildProcessInInstallScript: boolean;
    accessFSInJSFile: boolean;
    accessFSInInstallScript: boolean;
    accessNetworkInJSFile: boolean;
    accessNetworkInInstallScript: boolean;
    accessProcessEnvInJSFile: boolean;
    accessProcessEnvInInstallScript: boolean;
    accessCryptoAndZip: boolean;
    accessSensitiveAPI: boolean;
    containSuspiciousString: boolean;
    installCommand: string[],
    executeJSFiles: string[],
    packageName: string,
    version: string,
 }
 
type RecordFeatureInfo = Omit<PackageFeatureInfo, 'containBase64StringInJSFile' | 'containBase64StringInInstallScript' | 'installCommand' | 'executeJSFiles' | 'packageName' | 'version'>;

export interface PackageMetaData {
    packageName: string;
    version: string;
    packageSize: number;
}

export type DetectPackageResult = {
    metaData?: PackageMetaData;
    packagePath: string;
    isMalicious?: boolean;
    success: boolean;
    featurePosSet?: {
        [k in keyof RecordFeatureInfo]: Record[]
    },
    errorMessage?: string; 
};