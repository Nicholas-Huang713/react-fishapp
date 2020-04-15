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
        tackle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        longitude: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        imglocation: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Catch;
}