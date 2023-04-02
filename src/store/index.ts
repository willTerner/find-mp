import { makeAutoObservable } from "mobx";

export enum PageName{
    DETECT_SINGLE_PACKAGE,
    DETECT_DIRECTORY,
}

export class PageStore {
    currentPage = PageName.DETECT_SINGLE_PACKAGE;

    constructor() {
        makeAutoObservable(this);
    }

    setPageName = (pageName: PageName) => {
        this.currentPage = pageName;
    }
}