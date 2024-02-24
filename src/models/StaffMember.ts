import { StaffPassID } from './StaffPassID';

export class StaffMember {
  constructor(
    public readonly passId: StaffPassID,
    public readonly teamName: string
  ) {}
}