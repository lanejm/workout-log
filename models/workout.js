module.exports = (sequelize, DataTypes) => {
    return sequelize.define('workout', {
        nameOfExercise: {
            type: DataTypes.STRING,
            allowNull: false
        },
        muscleGroup: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberOfSets: DataTypes.INTEGER,
        numberOfReps: DataTypes.INTEGER,
        isCardio: DataTypes.BOOLEAN,
        isStrength: DataTypes.BOOLEAN
    });
};