const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  let rows = db.match_game_pairs.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id);
  if (req.query.mode) rows = rows.filter(r => r.mode === req.query.mode);
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const item = getDb().match_game_pairs.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { mode, left_value, right_value } = req.body;
  if (!mode || !left_value || !right_value) return res.status(400).json({ error: 'mode, left_value, right_value required' });
  if (!['english', 'bangla', 'numbers'].includes(mode)) return res.status(400).json({ error: 'mode must be english, bangla, or numbers' });
  const db = getDb();
  const item = { id: nextId(db), mode, left_value, right_value, sort_order: db.match_game_pairs.length };
  db.match_game_pairs.push(item);
  saveDb(db);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const { mode, left_value, right_value } = req.body;
  const db = getDb();
  const idx = db.match_game_pairs.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.match_game_pairs[idx] = { ...db.match_game_pairs[idx], mode, left_value, right_value };
  saveDb(db);
  res.json(db.match_game_pairs[idx]);
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  db.match_game_pairs = db.match_game_pairs.filter(i => i.id !== Number(req.params.id));
  saveDb(db);
  res.json({ success: true });
});

module.exports = router;
