import { FileReaderService } from "./FileReaderService"; // Adjust the import path as necessary
import { RedemptionService } from "./RedemptionService"; // Adjust the import path as necessary
import GiftRedemptionService from "./GiftRedemptionService"; // Adjust the import path as necessary

async function main() {
    // Initialize the required services
    const fileReaderService = new FileReaderService();
    const redemptionService = new RedemptionService();

    // Create an instance of GiftRedemptionService
    const giftRedemptionService = await GiftRedemptionService.createInstance(fileReaderService, redemptionService);

    // Example staff pass ID to redeem a gift for
    const staffPassId = "STAFF_H123804820G"; // Replace with an actual ID from your CSV

    // Attempt to redeem a gift
    const redemptionMessage = await giftRedemptionService.redeemGift(staffPassId);
    console.log(redemptionMessage);
}

main().catch(console.error);
