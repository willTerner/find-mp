import { makeAutoObservable } from "mobx";
import { DetectPackageResult } from "../interface";

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


export class PageStore {
    currentPage = PageName.DETECT_SINGLE_PACKAGE;

    classifier = Classifier.SVM;

    detectPackageResult?: DetectPackageResult;

    resultList?: DetectPackageResult[]; 

    packagePath = '';

    dirPath = '';

    totalPackageNumber?: number;

    detectPackageNumber = 0;

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

    setDetectPackageResult = (result: DetectPackageResult) => {
        this.detectPackageResult = result;
    }

    setResultList = (resultList: DetectPackageResult[]) => {
        this.resultList = resultList;
    }

    setTotalPackageNumber = (totalPackageNumber: number) => {
        this.totalPackageNumber = totalPackageNumber;
    }

    updateDetectProgress = () => {
        this.detectPackageNumber++;
    }
}