import { makeAutoObservable } from 'mobx'
import { type DetectPackageResult } from '../interface'

export enum Classifier {
    RF = 'RF',
    SVM = 'SVM',
    NB = 'NB',
    MLP = 'MLP',
}

export class PageStore {
    classifier = Classifier.SVM

    detectPackageResult?: DetectPackageResult

    resultList?: DetectPackageResult[]

    packagePath = ''

    dirPath = ''

    totalPackageNumber?: number

    detectPackageNumber = 0

    constructor () {
        makeAutoObservable(this)
    }

    setClassifier = (classifier: Classifier) => {
        this.classifier = classifier
    }

    setPackagePath = (packagePath: string) => {
        this.packagePath = packagePath
    }

    setDirPath = (dirPath: string) => {
        this.dirPath = dirPath
    }

    setDetectPackageResult = (result: DetectPackageResult) => {
        this.detectPackageResult = result
    }

    setResultList = (resultList: DetectPackageResult[]) => {
        this.resultList = resultList
    }

    setTotalPackageNumber = (totalPackageNumber: number) => {
        this.totalPackageNumber = totalPackageNumber
    }

    updateDetectProgress = () => {
        this.detectPackageNumber++
    }
}
