import { StaffMapping } from './StaffMapping';

export interface IFileReaderService {
    readStaffMapping(filePath: string): Promise<StaffMapping[]>;
  }
  