const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  name: String,
  userId: mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model('Project', ProjectSchema);