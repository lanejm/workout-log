module.exports = (sequelize, DataTypes) => {
    return sequelize.define('log', {
        description: {
            type: DataTypes.STRING
        },
        definition: {
            type: DataTypes.STRING
        },
        result: {
            type: DataTypes.STRING
        },
        owner_id: {
            type: DataTypes.INTEGER
        }
    });
};