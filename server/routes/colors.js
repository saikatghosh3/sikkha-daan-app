const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  res.json(db.colors.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id));
});

router.get('/:id', (req, res) => {
  const item = getDb().colors.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { name_en, name_bn, color, example } = req.body;
  if (!name_en || !name_bn || !color) return res.status(400).json({ error: 'name_en, name_bn, color required' });
  const db = getDb();
  const item = { id: nextId(db), name_en, name_bn, color, example: example || '', sort_order: db.colors.length };
  db.colors.push(item);
  saveDb(db);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const { name_en, name_bn, color, example } = req.body;
  const db = getDb();
  const idx = db.colors.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.colors[idx] = { ...db.colors[idx], name_en, name_bn, color, example };
  saveDb(db);
  res.json(db.colors[idx]);
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  db.colors = db.colors.filter(i => i.id !== Number(req.params.id));
  saveDb(db);
  res.json({ success: true });
});

module.exports = router;
