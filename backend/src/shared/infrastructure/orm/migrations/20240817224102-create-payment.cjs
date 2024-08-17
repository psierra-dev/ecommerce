"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.ENUM("cash", "card"),
      },
      status: {
        allowNull: false,
        defaultValue: "pending",
        type: Sequelize.ENUM("pending", "approved", "cancelled"),
      },
      order_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
  },
};
