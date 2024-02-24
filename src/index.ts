// Import the services
import { FileReaderService } from './FileReaderService';
import { RedemptionService } from './RedemptionService';
import GiftRedemptionService from './GiftRedemptionService';

// Create instances of the services
const fileReaderService = new FileReaderService();
const redemptionService = new RedemptionService();

async function runScenarios() {
    // Create the GiftRedemptionService instance
    const giftRedemptionService = await GiftRedemptionService.createInstance(fileReaderService, redemptionService);

    // Scenario 1: Attempt to redeem a gift with a valid staff pass ID (first attempt)
    console.log(`Attempting to redeem a gift for staff pass ID: ${'STAFF_H123804820G'}`);
    let message = await giftRedemptionService.redeemGift('STAFF_H123804820G');
    console.log(message);

    // Scenario 2: Attempt to redeem a gift with a valid staff pass ID (second attempt by the same team)
    console.log(`Attempting to redeem a gift for staff pass ID: ${'MANAGER_T999888420B'}`);
    message = await giftRedemptionService.redeemGift('MANAGER_T999888420B');
    console.log(message); // Should be successful on first attempt
    console.log(`Attempting to redeem a gift again for staff pass ID: ${'MANAGER_T999888420B'}`);
    message = await giftRedemptionService.redeemGift('MANAGER_T999888420B');
    console.log(message); // Should indicate already redeemed on second attempt

    // Scenario 3: Attempt to redeem a gift with an invalid staff pass ID
    console.log(`Attempting to redeem a gift for an invalid staff pass ID: ${'INVALID_STAFF_ID'}`);
    message = await giftRedemptionService.redeemGift('INVALID_STAFF_ID');
    console.log(message);
}

runScenarios().catch(console.error);
