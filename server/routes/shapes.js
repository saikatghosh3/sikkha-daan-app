const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  res.json(db.shapes.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id));
});

router.get('/:id', (req, res) => {
  const item = getDb().shapes.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { name_en, name_bn, svg_type, color } = req.body;
  if (!name_en || !name_bn) return res.status(400).json({ error: 'name_en and name_bn required' });
  const db = getDb();
  const item = { id: nextId(db), name_en, name_bn, svg_type: svg_type || 'custom', color: color || '#FF6B6B', sort_order: db.shapes.length };
  db.shapes.push(item);
  saveDb(db);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const { name_en, name_bn, svg_type, color } = req.body;
  const db = getDb();
  const idx = db.shapes.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.shapes[idx] = { ...db.shapes[idx], name_en, name_bn, svg_type, color };
  saveDb(db);
  res.json(db.shapes[idx]);
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  db.shapes = db.shapes.filter(i => i.id !== Number(req.params.id));
  saveDb(db);
  res.json({ success: true });
});

module.exports = router;
