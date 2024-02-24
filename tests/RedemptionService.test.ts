// tests/RedemptionService.test.ts

import { RedemptionService } from '../src/RedemptionService'; // Adjust the import path as necessary

describe('RedemptionService', () => {
  let redemptionService: RedemptionService;

  beforeEach(() => {
    // Now we're creating a new instance for each test block
    redemptionService = new RedemptionService();
  });

  test('should allow a team to redeem a gift if they have not already done so', () => {
    const teamName = 'Team A';
    expect(redemptionService.addRedemptionRecord(teamName)).toBe(true);
    expect(redemptionService.hasRedeemed(teamName)).toBe(true);
  });

  test('should not allow a team to redeem a gift more than once', () => {
    const teamName = 'Team B';
    expect(redemptionService.addRedemptionRecord(teamName)).toBe(true);
    expect(redemptionService.addRedemptionRecord(teamName)).toBe(false);
  });
});
