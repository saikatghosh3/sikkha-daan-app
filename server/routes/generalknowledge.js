const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  res.json(db.general_knowledge.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id));
});

router.get('/:id', (req, res) => {
  const item = getDb().general_knowledge.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { category, title, name, name_bn, image, description } = req.body;
  if (!category || !title) return res.status(400).json({ error: 'category and title required' });
  const db = getDb();
  const item = {
    id: nextId(db),
    category,
    title: title || '',
    name: name || '',
    name_bn: name_bn || '',
    image: image || '',
    description: description || '',
    sort_order: db.general_knowledge.length,
  };
  db.general_knowledge.push(item);
  saveDb(db);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const { category, title, name, name_bn, image, description } = req.body;
  const db = getDb();
  const idx = db.general_knowledge.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.general_knowledge[idx] = { ...db.general_knowledge[idx], category, title, name, name_bn, image, description };
  saveDb(db);
  res.json(db.general_knowledge[idx]);
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  db.general_knowledge = db.general_knowledge.filter(i => i.id !== Number(req.params.id));
  saveDb(db);
  res.json({ success: true });
});

module.exports = router;
