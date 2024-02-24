import { RedemptionService } from '../src/RedemptionService'; // Adjust the import path as necessary
import { RedemptionRecord } from '../src/models/RedemptionRecord'; // Import RedemptionRecord model

describe('RedemptionService', () => {
  let redemptionService: RedemptionService;

  beforeEach(() => {
    redemptionService = new RedemptionService();
  });

  test('should allow a team to redeem a gift if they have not already done so', () => {
    const teamName = 'Team A';
    const redemptionRecord: RedemptionRecord = {
      teamName: teamName,
      redeemedAt: new Date()
    };
    expect(redemptionService.addRedemptionRecord(redemptionRecord)).toBe(true);
    expect(redemptionService.hasRedeemed(teamName)).toBe(true);
  });

  test('should not allow a team to redeem a gift more than once', () => {
    const teamName = 'Team B';
    const redemptionRecord: RedemptionRecord = {
      teamName: teamName,
      redeemedAt: new Date()
    };
    expect(redemptionService.addRedemptionRecord(redemptionRecord)).toBe(true);
    expect(redemptionService.addRedemptionRecord(redemptionRecord)).toBe(false);
  });

  test('does not allow redemption for a non-existent team', async () => {
    const nonExistentTeamName = 'Non-Existent Team';
    expect(redemptionService.hasRedeemed(nonExistentTeamName)).toBe(false);
  });
});
