// RedemptionService.ts

export interface RedemptionRecord {
    team_name: string;
    redeemed_at: number;
  }
  
  export class RedemptionService {
    private redemptionRecords: Map<string, RedemptionRecord> = new Map();
  
    public addRedemptionRecord(teamName: string): boolean {
      if (this.redemptionRecords.has(teamName)) {
        return false; // Team has already redeemed their gift.
      }
  
      const redeemedAt = Date.now(); // Current timestamp in milliseconds.
      this.redemptionRecords.set(teamName, { team_name: teamName, redeemed_at: redeemedAt });
      return true;
    }
  
    public hasRedeemed(teamName: string): boolean {
      return this.redemptionRecords.has(teamName);
    }
  }
  