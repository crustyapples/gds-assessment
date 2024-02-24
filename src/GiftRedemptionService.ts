// GiftRedemptionService.ts
import { fileReaderService } from "./FileReaderService";
import { redemptionService } from "./RedemptionService";

class GiftRedemptionService {
  private staffMappings: Map<string, string> = new Map();

  private constructor() {}

  private async loadStaffMappings() {
    const mappings = await fileReaderService.readStaffMapping(
      "./data/staff-id-to-team-mapping.csv"
    );
      
    mappings.forEach((mapping) => {
      this.staffMappings.set(mapping.staff_pass_id, mapping.team_name);
    });
    
    console.log(this.staffMappings);
  }

  public static async createInstance(): Promise<GiftRedemptionService> {
    const service = new GiftRedemptionService();
    await service.loadStaffMappings();
    return service;
  }

  public async redeemGift(staffPassId: string): Promise<string> {
    if (!this.staffMappings.has(staffPassId)) {
      return "Invalid staff pass ID.";
    }

    const teamName = this.staffMappings.get(staffPassId);
    if (!teamName) {
      return "Team not found for this staff pass ID.";
    }

    if (redemptionService.hasRedeemed(teamName)) {
      return "This team has already redeemed their gift.";
    } else {
      redemptionService.addRedemptionRecord(teamName);
      return "Gift redeemed successfully!";
    }
  }
}

export default GiftRedemptionService;
