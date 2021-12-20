const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Interior', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        center_display: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        air_condition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gps: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        bluetooth: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        usb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        wireless: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        ambient_lights: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        audio_system: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        power_outlet: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        seat_row_second: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        seat_row_third: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
};