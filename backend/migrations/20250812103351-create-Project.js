"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      owner: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      forks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      issues: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      creation_date: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("projects", ["user_id"], {
      name: "projects_user_id_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("projects");
  },
};
