'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        id: "594dcf5a-e5df-4d2e-8f0d-d9a6f721e81e",
        name: "Sr. Batata",
        email: "batata@gmail.com",
        role: "administrator",
        isActive: 1,
        hashedPassword: "$2b$08$hZSZOrtVzoZT7ECpYnGjdOLL2G3dZV3Bq7JEO5mNXlmH/JJwhES3e",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: "77687387-7038-46c6-b1d7-5288aa9edb08",
        name: "Mr. Silva",
        email: "silva@gmail.com",
        role: "seller",
        isActive: 1,
        hashedPassword: "$2b$08$FF8UL/bsOTR4rrIH6910qud84eTeFZtlnr1T3wevHa9a9r7/s7DPq",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: "77687387-7038-46c6-b1d7-5288aa9edb08",
        name: "Dr. Demitido",
        email: "demitido@gmail.com",
        role: "stockist",
        isActive: 0,
        hashedPassword: "$2b$08$FF8UL/bsOTR4rrIH6910qud84eTeFZtlnr1T3wevHa9a9r7/$0F8UL",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
