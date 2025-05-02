const router = require('express').Router();
const Task = require('../models/Task');

router.post('/:projectId', async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.create({ title, description, status, projectId: req.params.projectId });
  res.status(201).json(task);
});

router.get('/:projectId', async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
});

router.put('/:taskId', async (req, res) => {
  const { title, description, status } = req.body;
  const completedAt = status === 'Done' ? new Date() : null;
  const task = await Task.findByIdAndUpdate(req.params.taskId, { title, description, status, completedAt }, { new: true });
  res.json(task);
});

router.delete('/:taskId', async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.send('Deleted');
});

module.exports = router;