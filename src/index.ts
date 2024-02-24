// index.ts

import GiftRedemptionService from './GiftRedemptionService';

async function testRedemptionFlow() {
  const giftRedemptionService = await GiftRedemptionService.createInstance();

  // List of staff pass IDs to test - adjust these based on your CSV data
  const staffPassIds = [
    "STAFF_H123804820G", // Assume valid
    "MANAGER_T999888420B", // Assume valid, different team
    "STAFF_H123804820G", // Duplicate, should fail on second attempt
    "INVALID_ID" // Invalid, should not find a mapping
  ];

  // Run through each test case
  for (const staffPassId of staffPassIds) {
    console.log(`Attempting to redeem gift for staff pass ID: ${staffPassId}`);
    try {
      const result = await giftRedemptionService.redeemGift(staffPassId);
      console.log(result);
    } catch (error) {
      console.error(`Error redeeming gift for ${staffPassId}:`, error);
    }
    console.log('---'); // Separator for readability
  }
}

testRedemptionFlow().then(() => {
  console.log('Finished testing redemption flow.');
}).catch((error) => {
  console.error('An error occurred during the redemption flow test:', error);
});
