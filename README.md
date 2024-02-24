# Gift Redemption System

The Gift Redemption System is a Node.js application built to manage the distribution and redemption of gifts to teams within a department. This README provides an overview of the project, including setup instructions, testing procedures, and design considerations.

## Setup

To set up the Gift Redemption System locally, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/crustyapples/gds-assessment.git
```

2. Install dependencies:

```bash
npm install
```

3. Build the TypeScript code to generate the compiled JavaScript files:

```bash
npx tsc
```

4. Start the application:

```bash
node dist/index.js
```

## Testing

The Gift Redemption System includes a comprehensive testing strategy to ensure the reliability and correctness of its functionality. The testing strategy consists of the following components:

### Tests

The Unit tests are written using Jest and are located in the `tests` directory.
To run the unit tests, use the following command:

```bash
npm test
```

| Test Type       | Test                                                                                        | Description                                                                                     | File                            |
|-----------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|---------------------------------|
| Unit Test       | `should allow a team to redeem a gift if they have not already done so`                      | Verifies that the `addRedemptionRecord` method allows a team to redeem a gift if they have not already done so. | RedemptionService.test.ts     |
| Unit Test       | `should not allow a team to redeem a gift more than once`                                    | Verifies that the `addRedemptionRecord` method does not allow a team to redeem a gift more than once. | RedemptionService.test.ts     |
| Unit Test       | `does not allow redemption for a non-existent team`                                          | Verifies that the `hasRedeemed` method does not allow redemption for a non-existent team.      | RedemptionService.test.ts     |


| Test Type        | Test                                                                                        | Description                                                                                                                                      | File                            |
|------------------|---------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| Integration Test | `rejects redemption for an invalid staff pass ID`                                           | Verifies that the `redeemGift` method correctly interacts with the `FileReaderService` to reject redemption for an invalid staff pass ID.         | GiftRedemptionService.test.ts |
| Integration Test | `does not allow redeeming a gift for a team that has already redeemed`                      | Verifies that the `redeemGift` method properly integrates with the `RedemptionService` to prevent redeeming a gift for a team that has already done so. | GiftRedemptionService.test.ts |
| Integration Test | `allows redemption for a valid staff pass ID and a team that has not redeemed`              | Verifies that the `redeemGift` method effectively interacts with both the `FileReaderService` and `RedemptionService` to allow redemption for a valid staff pass ID and a team that has not redeemed. | GiftRedemptionService.test.ts |

