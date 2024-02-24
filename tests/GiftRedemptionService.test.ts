import GiftRedemptionService from '../src/GiftRedemptionService';
import * as FileReaderServiceModule from '../src/FileReaderService';
import * as RedemptionServiceModule from '../src/RedemptionService';

jest.mock('../src/FileReaderService', () => ({
  FileReaderService: jest.fn().mockImplementation(() => ({
    readStaffMapping: jest.fn().mockResolvedValue([
      { staff_pass_id: 'VALID_STAFF_ID', team_name: 'Team X', created_at: '1234567890' },
    ])
  }))
}));

jest.mock('../src/RedemptionService', () => ({
  RedemptionService: jest.fn().mockImplementation(() => ({
    hasRedeemed: jest.fn(), // We'll set specific behavior in each test
    addRedemptionRecord: jest.fn().mockReturnValue(true),
  }))
}));

describe('GiftRedemptionService', () => {
    let giftRedemptionService: GiftRedemptionService;
    let fileReaderService: FileReaderServiceModule.FileReaderService;
    let redemptionService: RedemptionServiceModule.RedemptionService;
  
    beforeEach(() => {
      // Obtain the mocked instances
      fileReaderService = new FileReaderServiceModule.FileReaderService();
      redemptionService = new RedemptionServiceModule.RedemptionService();
  
      // Casting to jest.Mock to use Jest mock functions like mockReturnValueOnce
      (redemptionService.hasRedeemed as jest.Mock).mockReturnValue(false); // Default behavior
  
      giftRedemptionService = new GiftRedemptionService(fileReaderService, redemptionService);
    });
  
    test('rejects redemption for an invalid staff pass ID', async () => {
      const response = await giftRedemptionService.redeemGift('INVALID_STAFF_ID');
      expect(response).toBe('Invalid staff pass ID.');
    });
  
    test('does not allow redeeming a gift for a team that has already redeemed', async () => {
      (redemptionService.hasRedeemed as jest.Mock).mockReturnValueOnce(true);
      const response = await giftRedemptionService.redeemGift('VALID_STAFF_ID');
      expect(response).toBe('This team has already redeemed their gift.');
    });
  
    test('allows redemption for a valid staff pass ID and a team that has not redeemed', async () => {
      // Assuming 'Team X' has not redeemed yet (default mock behavior set in beforeEach)
      const response = await giftRedemptionService.redeemGift('VALID_STAFF_ID');
      expect(response).toBe('Gift redeemed successfully!');
      expect(redemptionService.addRedemptionRecord).toHaveBeenCalled();
    });
});
  
  