// do we need a field for hashed passwords?
module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
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