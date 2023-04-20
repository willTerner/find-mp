import fs from 'fs';

export async function readFileByLine(filePath: string, startLine: number, endLine: number) {
	return new Promise(resolve => {
		let currentLine = 0;
		let remain = '';
		let result = '';

		
		try{
			const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

			const matchLine = (chunk: string|Buffer, isEndCallback: boolean) => {
				remain += chunk;

				const lines = remain.split('\n');
				remain = lines.pop();

				for (const line of lines) {
					currentLine++;
					if (currentLine >= startLine && currentLine <= endLine) {
						result += line + '\n';
					}

					if (currentLine === endLine) {
						return result;
					}
				}

				if (isEndCallback) {
					return result;
				}
			};

			const dataCallback = (chunk: string | Buffer) => {
				const result = matchLine(chunk, false);
				if (result) {
					stream.close();
					resolve(result);
				}
			};

			const endCallback = (chunk: string | Buffer) => {
				const result = matchLine(chunk, true);
				stream.close();
				resolve(result);
			};

			stream.on('data', dataCallback);
			stream.on('end', endCallback);

		}catch(error) {
			return resolve(undefined);
		}
	});
}