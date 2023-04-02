import { observer } from "mobx-react";
import React from "react";
import { Classifier, PageStore } from "../../store";
import useStore from "../../hooks/useStore";
import s from './index.module.scss';
import { Select } from "antd";

export const  DetectSinglePackage = observer(() => {
    const { setClassifier } = useStore<PageStore>();
    
    const selectClassifier = (classifier: string) => {
        setClassifier(classifier as Classifier);
    }

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
        </div>
    );
});