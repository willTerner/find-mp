import { createHashRouter } from 'react-router-dom'
import React from 'react'
import { DetectSinglePackage } from '@pages/DetectSinglePackage'
import { PagePath } from '@interface'
import { Layout } from '@layout/index'
import { DetectDirectory } from '@pages/DetectDirectory'
import { ResultDetail } from '@pages/ResultDetail'
import { ResultList } from '@pages/ResultList'

export const router = createHashRouter([
    {
        path: PagePath.ROOT_PATH,
        element: <Layout></Layout>,
        children: [
            {
                index: true,
                element: <DetectSinglePackage></DetectSinglePackage>
            },
            {
                path: PagePath.DETECT_SINGLE_PACKAGE.substring(1),
                element: <DetectSinglePackage></DetectSinglePackage>
            },
            {
                path: PagePath.DETECT_DIRECTORY.substring(1),
                element: <DetectDirectory></DetectDirectory>
            },
            {
                path: PagePath.RESULT_DETAIL.substring(1),
                element: <ResultDetail></ResultDetail>
            },
            {
                path: PagePath.RESULT_LIST.substring(1),
                element: <ResultList></ResultList>
            }
        ]
    }
])
