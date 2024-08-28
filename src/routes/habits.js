const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find(req.query);
    res.json(habits);
  } catch (err) {
    console.error('Error fetching habits:', err);
    res.status(500).json({ message: 'Error fetching habits', error: err.message });
  }
});

// Get a single habit
router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.json(habit);
  } catch (err) {
    console.error('Error fetching habit:', err);
    res.status(500).json({ message: 'Error fetching habit', error: err.message });
  }
});

// Add new habit
router.post('/add', async (req, res) => {
  console.log('Received habit data:', req.body);
  const habit = new Habit(req.body);
  try {
    const newHabit = await habit.save();
    console.log('Saved habit:', newHabit);
    res.status(201).json(newHabit);
  } catch (err) {
    console.error('Error saving habit:', err);
    res.status(400).json({ message: 'Error saving habit', error: err.message });
  }
});

// Update habit
router.put('/update/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.json(habit);
  } catch (err) {
    console.error('Error updating habit:', err);
    res.status(400).json({ message: 'Error updating habit', error: err.message });
  }
});

// Delete habit
router.delete('/delete/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.json({ message: 'Habit deleted successfully' });
  } catch (err) {
    console.error('Error deleting habit:', err);
    res.status(500).json({ message: 'Error deleting habit', error: err.message });
  }
});

module.exports = router;