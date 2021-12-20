const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Exterior', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        headlights: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        frog_light: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        outside_rear_view_mirror: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        auto_wiper: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        power_window: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dual_exhaust_pipe: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};