import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Parser } from 'csv-parse';

interface StaffMapping {
  staff_pass_id: string;
  team_name: string;
  created_at: string;
}

class FileReaderService {
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
        while (record = parser.read()) { // Use 'parser' directly instead of 'this'
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

export const fileReaderService = new FileReaderService();
