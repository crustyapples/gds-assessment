import { RedemptionRecord } from './models/RedemptionRecord';
import { Team } from './models/Team';

export class RedemptionService {
  private redemptionRecords = new Map<string, RedemptionRecord>();

  public addRedemptionRecord(record: RedemptionRecord): boolean {
    const { teamName, redeemedAt } = record;
    if (this.redemptionRecords.has(teamName)) {
      return false; // Team has already redeemed their gift.
    }

    this.redemptionRecords.set(teamName, { teamName, redeemedAt });
    return true;
  }

  public hasRedeemed(teamName: string): boolean {
    return this.redemptionRecords.has(teamName);
  }
}