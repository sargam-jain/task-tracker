const router = require('express').Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  const projects = await Project.find({ userId: req.userId });
  res.json(projects);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const count = await Project.countDocuments({ userId: req.userId });
  if (count >= 4) return res.status(400).send('Maximum 4 projects allowed');
  const project = await Project.create({ name, userId: req.userId });
  res.status(201).json(project);
});

module.exports = router;