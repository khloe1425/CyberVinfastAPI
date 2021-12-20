const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Fee', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        edition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        offers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        registration_fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        road__usage_fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        insurance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inspection: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        license_plate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        others_fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};