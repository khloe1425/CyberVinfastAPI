const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Service', {
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
        kilo_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        license_plate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
};