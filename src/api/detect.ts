import { readFile } from "fs/promises";
import { DetectPackageResult } from "../interface";
import { join } from 'path';
import { asyncExec, getPackageMetaData } from "../util";

const FEATURE_EXTRACT_PATH = `/Users/huchaoqun/Desktop/code/school-course/毕设/source-code/feature-extract`;
const NODE_PATH = '/Users/huchaoqun/.nvm/versions/node/v16.16.0/bin/node';

export async function analyzeSinglePackage(packagePath: string): Promise<DetectPackageResult> {
    const command = `cd ${FEATURE_EXTRACT_PATH} && ${NODE_PATH} --es-module-specifier-resolution=node out/src/index.js -s ${packagePath}`;
    try{
       const {stdout, stderr} = await asyncExec(command, { shell: '/bin/zsh' });
       if (!(stdout + stderr).match(/.*完成对.*的分析.*/)) {
          return {
             success: false,
             errorMessage: JSON.stringify(stdout + stderr),
             packagePath,
          };
       }
       const metaData = await getPackageMetaData(packagePath);
       const feautre_pos_path = join(packagePath, 'feature-position-info.json');
       try{
          const jsonContent = await readFile(feautre_pos_path, { encoding: 'utf-8' });
          return {
             success: true,
             isMalicious: true,
             featurePosSet: JSON.parse(jsonContent),
             packagePath,
             metaData,
          };
       }catch(e) {
          return {
             success: true,
             isMalicious: false,
             packagePath,
             metaData,
          };
       }
    }catch(error) {
       return {
          success: false,
          errorMessage: JSON.stringify({
             name: error.name,
             message: error.message,
             stack: error.stack
          }),
          packagePath,
       };
    }
 }