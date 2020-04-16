module.exports = (sequelize, DataTypes) => {
    const Catch = sequelize.define("Catch", {
        species: {
            type: DataTypes.STRING,
            allowNull: false
        },
        water: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bait: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DECIMAL(20, 8),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(20, 8),
            allowNull: false
        }
    });
    return Catch;
}