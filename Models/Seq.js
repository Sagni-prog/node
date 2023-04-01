const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Seq = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Seq === sequelize.models.User); // true


await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");
// await Seq.sync({ force: true });
// console.log("The table for the User model was just (re)created!");