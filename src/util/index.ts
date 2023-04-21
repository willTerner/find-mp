import {promisify} from 'node:util';
import {exec} from 'child_process';
import { PackageMetaData } from '../interface';
import { join } from 'path';
import { readFile, readdir, stat } from 'fs/promises';


export const asyncExec = promisify(exec);

export async function getDirectorySize(dirPath: string) {
    let result = 0;
    async function resolve(dirPath: string) {
        const dir = await readdir(dirPath, { withFileTypes: true });
        for (const dirent of dir) {
            if (dirent.isFile()) {
                const stats = await stat(join(dirPath, dirent.name));
                result += stats.size;
            } else if (dirent.isDirectory()){
                await resolve(join(dirPath, dirent.name));
            }
        }
    }
    await resolve(dirPath);
    return result;
}

export  async function getPackageMetaData(packagePath: string): Promise<PackageMetaData> {
    const packageJSONPath = join(packagePath, 'package.json');
    const packageMeta = JSON.parse(await readFile(packageJSONPath, { encoding: 'utf-8' }));
    const size = await getDirectorySize(packagePath);
    return {
        packageName: packageMeta.name,
        version: packageMeta.version,
        packageSize: size,
    };
}