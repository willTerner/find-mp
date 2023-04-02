import React from "react";
import { PageName, PageStore } from "../store";
import useStore from "../hooks/useStore";
import DetectSinglePackage from "../pages/DetectSinglePackage";
import DetectDirectory from "../pages/DetectDirectory";

export default function Router() {
    const { currentPage } = useStore<PageStore>();
    switch(currentPage) {
        case PageName.DETECT_SINGLE_PACKAGE:
            return <DetectSinglePackage></DetectSinglePackage>;
        case PageName.DETECT_DIRECTORY:
            return <DetectDirectory></DetectDirectory>;
    }
}