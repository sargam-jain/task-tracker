const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['ToDo', 'InProgress', 'Done'], default: 'ToDo' },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  projectId: mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model('Task', TaskSchema);
