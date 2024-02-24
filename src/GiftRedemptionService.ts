// GiftRedemptionService.ts
import { FileReaderService } from "./FileReaderService";
import { RedemptionService } from "./RedemptionService";

export class GiftRedemptionService {
  private staffMappings: Map<string, string> = new Map();

  private fileReaderService: FileReaderService;
  private redemptionService: RedemptionService;

  constructor(fileReaderService: FileReaderService, redemptionService: RedemptionService) {
    this.fileReaderService = fileReaderService;
    this.redemptionService = redemptionService;
    this.loadStaffMappings(); // Consider calling this method outside the constructor if it's not ideal to do async work inside constructors.
  }

  private async loadStaffMappings() {
    const mappings = await this.fileReaderService.readStaffMapping("./data/staff-id-to-team-mapping.csv");
    mappings.forEach((mapping) => {
      this.staffMappings.set(mapping.staff_pass_id, mapping.team_name);
    });
  }

  public static async createInstance(fileReaderService: FileReaderService, redemptionService: RedemptionService): Promise<GiftRedemptionService> {
    const service = new GiftRedemptionService(fileReaderService, redemptionService);
    await service.loadStaffMappings(); // Ensure mappings are loaded before returning the instance
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
      this.redemptionService.addRedemptionRecord(teamName);
      return "Gift redeemed successfully!";
    }
  }
}

export default GiftRedemptionService;
