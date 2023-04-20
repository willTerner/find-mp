import { readFile, readdir } from "fs/promises";
import { DetectPackageResult } from "../interface";
import { join, basename } from 'path';
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

 /**
 * 
 * @param dirPath 目录，目录中包含npm包，可以是多级
 * @returns 返回dirPath中所有npm包的路径
 */
async function getPackagesFromDir(dirPath: string) {
   const result: string[] = [];
   async function resolve(dirPath: string) {
     const files = await readdir(dirPath, {withFileTypes: true});
     for (const file of files) {
       if (file.name === 'package.json' && basename(dirPath) === 'package') {
         result.push(dirPath);
         return ;
       }
       if (file.isDirectory() && file.name !== 'node_modules') {
         await resolve(join(dirPath, file.name));
       }
     }
   }
   await resolve(dirPath);
   return result;
}

export async function analyzeDirectory(dirPath: string): Promise<DetectPackageResult[]> {
   const packages = await getPackagesFromDir(dirPath);
   const result: DetectPackageResult[] = [];

   for (const packagePath of packages) {
      result.push(await analyzeSinglePackage(packagePath));
   }

   return result;
}