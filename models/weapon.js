var mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
    avenger: String,
    weapon: String,
});

var weapons = mongoose.model("weapons", nameSchema);

module.exports = weapons;