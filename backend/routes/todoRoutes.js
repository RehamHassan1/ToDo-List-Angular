const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    console.log('Backend: Received todo data:', req.body);
    const newTodo = new Todo({
      title: req.body.title,
      note: req.body.note || undefined,
      label: req.body.label || undefined,
      date: req.body.date || undefined,
      completed: req.body.completed || false
    });
    const savedTodo = await newTodo.save();
    console.log('Backend: Saved todo:', savedTodo);
    res.json(savedTodo);
  } catch (err) {
    console.error('Backend: Error saving todo:', err);
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    console.log('Backend: Updating todo with ID:', req.params.id);
    console.log('Backend: Update data:', req.body);
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Backend: Updated todo:', updated);
    res.json(updated);
  } catch (err) {
    console.error('Backend: Error updating todo:', err);
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;