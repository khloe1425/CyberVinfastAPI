const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Car', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seat: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        engine: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fuel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        original: {
            type: DataTypes.STRING,
            allowNull: false
        },
        countInStock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};