import { observer } from "mobx-react";
import React, { useState } from "react";
import { Classifier, PageName } from "../../store";
import useStore from "../../hooks/useStore";
import s from './index.module.scss';
import { Button, Select } from "antd";
import { SelectDirectory } from "../../component/SelectDirectory";
import { API_KEY, BridgeWindow } from "../../interface";
import useMessageApi from "../../hooks/useMessageApi";

export const  DetectDirectory= observer(() => {
    const { setClassifier, setDirPath, dirPath, setResultList, setIsAnalyzing, setPageName } = useStore();
    const messageApi = useMessageApi();
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    
    const selectClassifier = (classifier: string) => {
        setClassifier(classifier as Classifier);
    }

    const startAnalyze = async () => {
        if (!dirPath) {
            messageApi.error('请选择目录');
            return;
        }
        setIsAnalyzing(true);
        const result = await ((window as unknown as BridgeWindow)[API_KEY.ANALYZE_DIRECTORY](dirPath));
        setIsAnalyzing(false);
        setResultList(result);
        setIsAnalyzed(true);
    };

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
            <SelectDirectory onSelectFile={packagePath => setDirPath(packagePath)} uploadText={'点击上传目录'}></SelectDirectory>
            <Button type='primary' onClick={startAnalyze} style={{ marginBottom: "0.4rem"}}>开始分析</Button>
            { isAnalyzed && <Button type="link" onClick={() => setPageName(PageName.RESULT_LIST)}>查看分析结果</Button>}
        </div>
    );
});