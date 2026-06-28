const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  res.json(db.english_alphabet.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id));
});

router.get('/:id', (req, res) => {
  const item = getDb().english_alphabet.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { character, image } = req.body;
  if (!character) return res.status(400).json({ error: 'character required' });
  const db = getDb();
  const item = { id: nextId(db), character, image: image || '', sort_order: db.english_alphabet.length };
  db.english_alphabet.push(item);
  saveDb(db);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const { character, image } = req.body;
  const db = getDb();
  const idx = db.english_alphabet.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.english_alphabet[idx] = { ...db.english_alphabet[idx], character, image };
  saveDb(db);
  res.json(db.english_alphabet[idx]);
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  db.english_alphabet = db.english_alphabet.filter(i => i.id !== Number(req.params.id));
  saveDb(db);
  res.json({ success: true });
});

module.exports = router;
