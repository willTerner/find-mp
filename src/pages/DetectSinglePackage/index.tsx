import { observer } from "mobx-react";
import React, { useState } from "react";
import { Classifier, PageName } from "../../store";
import useStore from "../../hooks/useStore";
import s from './index.module.scss';
import { Button, Select, Spin } from "antd";
import { SelectDirectory } from "../../component/SelectDirectory";
import { API_KEY, BridgeWindow } from "../../interface";
import useMessageApi from "../../hooks/useMessageApi";
import { pushClosableMessage } from "../../util/info";
import Portal from "../../component/Portal";
import Mask from "../../component/Mask";
import { LoadingOutlined } from "@ant-design/icons";
import { PAGE_PARENT_ID } from "../../constant";
import { useLockFn } from "../../hooks/useLockFn";

export const  DetectSinglePackage = observer(() => {
    const { setClassifier, setPackagePath, packagePath, setDetectPackageResult, setPageName } = useStore();
    const messageApi = useMessageApi();

    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const selectClassifier = (classifier: string) => {
        setClassifier(classifier as Classifier);
    }

    const startAnalyze = useLockFn(async () => {
        if (!packagePath) {
            messageApi.error('请选择npm包');
            return;
        }
        
        if (isAnalyzing) {
            messageApi.error('请等待分析结束后重试');
            return;
        }

        setIsAnalyzing(true);
        const result = await ((window as unknown as BridgeWindow)[API_KEY.ANALYZE_SINGLE_PACKAGE](packagePath));
        setIsAnalyzing(false);
        if (!result.success) {
            const message = JSON.parse(result.errorMessage);
            if (typeof message === 'string') {
                pushClosableMessage(messageApi, 'error', message);
            } else {
                pushClosableMessage(messageApi, 'error',`error name: ${message.name}\nerror message: ${message.message}`);
            }
            return;
        }
        setDetectPackageResult(result);
        setIsAnalyzed(true);
    });

    return (
        <div className={s.wrapper}>
            <div className={s.classifier}>
                <span className={s.classifierLabel}>分类器</span>
                <Select 
                    style={{width: '3.3rem'}}
                    defaultValue={Classifier.SVM}
                    onChange={selectClassifier}
                    options={[
                        {value: Classifier.SVM, label: 'Kernel SVM'},
                        {value: Classifier.NB, label: 'Naive Bayes'},
                        {value: Classifier.RF, label: 'Random Forest'},
                        {value: Classifier.MLP, label: 'Multi Layer Perceptron'}
                    ]}>
                </Select>
            </div>
            <SelectDirectory onSelectFile={packagePath => setPackagePath(packagePath)} uploadText={"点击上传npm包"}></SelectDirectory>
            <Button type='primary' onClick={startAnalyze} style={{ marginBottom: "0.4rem"}}>开始分析</Button>
            { isAnalyzed && <Button type="link" onClick={() => setPageName(PageName.RESULT_DETAIL)}>查看分析结果</Button>}
            <Portal parentContainer={document.getElementById(PAGE_PARENT_ID)} isShowPortal={isAnalyzing}>
                <Mask>
                    <Spin 
                        indicator={<LoadingOutlined style={{ color: 'white' }}></LoadingOutlined>}
                        size={"large"}>
                    </Spin> 
                </Mask>
            </Portal>
        </div>
    );
});