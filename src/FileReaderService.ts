// FileReaderService.ts
import { IFileReaderService } from './IFileReaderService';
import { StaffMapping } from './StaffMapping';
import { parse } from 'csv-parse';
import * as fs from 'fs';

export class FileReaderService implements IFileReaderService {
  async readStaffMapping(filePath: string): Promise<StaffMapping[]> {
    return new Promise((resolve, reject) => {
      const results: StaffMapping[] = [];
      const parser = fs.createReadStream(filePath)
        .pipe(parse({
          columns: true,
          skip_empty_lines: true,
          bom: true
        }));

      parser.on('readable', function() {
        let record;
        while (record = parser.read()) { 
          results.push(record);
        }
      });

      parser.on('end', () => {
        resolve(results);
      });

      parser.on('error', reject);

    });
  }
}