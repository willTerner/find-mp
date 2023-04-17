const str = '2023/4/17 15:30:20: 完成对1337qq-js@1.0.10的分析. 它是 恶意包. 恶意特征位置记录在/Users/huchaoqun/Desktop/code/school-course/毕设/数据集/duan/1337qq-js-1.0.10/package/feature-position-info.json ';

const result = str.match(/.*完成对.*的分析.*/);
console.log(result);