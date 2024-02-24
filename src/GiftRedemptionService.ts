import { FileReaderService } from "./FileReaderService";
import { RedemptionService } from "./RedemptionService";
import { StaffMapping } from "./StaffMapping";
import { RedemptionRecord } from "./models/RedemptionRecord";

export class GiftRedemptionService {
  private staffMappings: Map<string, string> = new Map();

  private fileReaderService: FileReaderService;
  private redemptionService: RedemptionService;

  constructor(fileReaderService: FileReaderService, redemptionService: RedemptionService) {
    this.fileReaderService = fileReaderService;
    this.redemptionService = redemptionService;
    this.loadStaffMappings();
  }

  private async loadStaffMappings() {
    const mappings: StaffMapping[] = await this.fileReaderService.readStaffMapping("./data/staff-id-to-team-mapping.csv");
    mappings.forEach((mapping) => {
      this.staffMappings.set(mapping.staff_pass_id, mapping.team_name);
    });
  }

  public static async createInstance(fileReaderService: FileReaderService, redemptionService: RedemptionService): Promise<GiftRedemptionService> {
    const service = new GiftRedemptionService(fileReaderService, redemptionService);
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

    if (this.redemptionService.hasRedeemed(teamName)) {
      return "This team has already redeemed their gift.";
    } else {
      const redemptionRecord: RedemptionRecord = {
        teamName: teamName,
        redeemedAt: new Date()
      };
      this.redemptionService.addRedemptionRecord(redemptionRecord);
      return "Gift redeemed successfully!";
    }
  }
}
