const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Showroom', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        town: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};