const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific tournament
router.get('/:id', getTournament, (req, res) => {
  res.json(res.tournament);
});

// Create a new tournament
router.post('/', async (req, res) => {
  const tournament = new Tournament({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    const newTournament = await tournament.save();
    res.status(201).json(newTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a tournament
router.patch('/:id', getTournament, async (req, res) => {
  if (req.body.name != null) {
    res.tournament.name = req.body.name;
  }
  if (req.body.startDate != null) {
    res.tournament.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.tournament.endDate = req.body.endDate;
  }

  try {
    const updatedTournament = await res.tournament.save();
    res.json(updatedTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tournament
router.delete('/:id', getTournament, async (req, res) => {
  try {
    await res.tournament.remove();
    res.json({ message: 'Tournament deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTournament(req, res, next) {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (tournament == null) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.tournament = tournament;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
