const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SafeSystem', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        front_brakes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rear_brake: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ebp: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        abs: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        brake_assist: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        esc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        tsc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hsa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hdc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        roll_mitigation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        emergency_stop: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        front_parking_sensor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        rear_parking_sensor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        back_camera: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        panoramic_camera: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        door_lock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        airbag: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        anti_thief: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
};