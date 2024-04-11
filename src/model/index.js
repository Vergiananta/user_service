const role = require("./Role");
const user = require("./User");
const absence = require("./Absence");

const dbAssociations = function dbAssociations() {
  role.hasMany(user);
  user.belongsTo(role);
  user.hasMany(absence);
  absence.belongsTo(user);
};

module.exports = dbAssociations;
