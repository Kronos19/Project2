// do we need a field for hashed passwords?
module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INT,
      autoIncrement: true,
      primaryKey: true
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 45]
      }
    },
    correct: {
      type: DataTypes.TEXT,
    },
    incorrect: {
      type: DataTypes.TEXT
    },
  });
  return Users;
}