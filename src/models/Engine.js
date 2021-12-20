const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Engine', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        max_power: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max_torque: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idling_top: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        transmission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        drive_train: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fuel_consuming: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        front_suspension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rear_suspension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        steering: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};