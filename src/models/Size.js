const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Size', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wheelbase: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        load_capacity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ground_clearance: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};