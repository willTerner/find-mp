import React from "react";
import { PageName } from "../store";
import useStore from "../hooks/useStore";
import { DetectSinglePackage } from "../pages/DetectSinglePackage";
import { DetectDirectory } from "../pages/DetectDirectory";
import { ResultDetail } from "../pages/ResultDetail";
import { ResultList }from "../pages/ResultList";
import { observer } from "mobx-react";

export const  Router = observer(() => {
    const { currentPage } = useStore();
    switch(currentPage) {
        case PageName.DETECT_SINGLE_PACKAGE:
            return <DetectSinglePackage></DetectSinglePackage>;
        case PageName.DETECT_DIRECTORY:
            return <DetectDirectory></DetectDirectory>;
        case PageName.RESULT_DETAIL:
            return <ResultDetail></ResultDetail>;
        case PageName.RESULT_LIST:
            return <ResultList></ResultList>;
    }
});