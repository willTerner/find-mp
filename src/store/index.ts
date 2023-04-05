import { makeAutoObservable } from "mobx";

export enum PageName{
    DETECT_SINGLE_PACKAGE,
    DETECT_DIRECTORY,
    RESULT_DETAIL,
    RESULT_LIST,
}

export enum Classifier {
    RF = 'RF',
    SVM = 'SVM',
    NB = 'NB',
    MLP = 'MLP',
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
 
type RecordFeatureInfo = Omit<PackageFeatureInfo, 'containBase64StringInJSFile' | 'containBase64StringInInstallScript' | 'installCommand' | 'executeJSFiles' | 'packageName' | 'version'>;

export interface DetectResultDetail {
    packageName: string;
    version: string;
    path: string;
    size: number; // 单位字节
    isMalicious: boolean;
    featurePos: {
        [k in keyof RecordFeatureInfo]: Record[]
    }
}

export class PageStore {
    currentPage = PageName.DETECT_SINGLE_PACKAGE;

    classifier = Classifier.SVM;

    detectResultDetail: DetectResultDetail | null = null;

    resultList: DetectResultDetail[] = [];

    packagePath = '';

    dirPath = '';

    constructor() {
        makeAutoObservable(this);
    }

    setPageName = (pageName: PageName) => {
        this.currentPage = pageName;
    }

    setClassifier = (classifier: Classifier) => {
        this.classifier = classifier;
    }

    setPackagePath = (packagePath: string) => {
        this.packagePath = packagePath;
    }

    setDirPath = (dirPath: string) => {
        this.dirPath = dirPath;
    }
}