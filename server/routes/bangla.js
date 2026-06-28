const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

function getItems(table) {
  const db = getDb();
  return db[table].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id);
}

function getItem(table, id) {
  return getDb()[table].find(i => i.id === Number(id)) || null;
}

function createItem(table, fields) {
  const db = getDb();
  const item = { id: nextId(db), ...fields, sort_order: db[table].length };
  db[table].push(item);
  saveDb(db);
  return item;
}

function updateItem(table, id, fields) {
  const db = getDb();
  const idx = db[table].findIndex(i => i.id === Number(id));
  if (idx === -1) return null;
  db[table][idx] = { ...db[table][idx], ...fields };
  saveDb(db);
  return db[table][idx];
}

function deleteItem(table, id) {
  const db = getDb();
  db[table] = db[table].filter(i => i.id !== Number(id));
  saveDb(db);
  return { success: true };
}

// Vowels
router.get('/vowels', (req, res) => res.json(getItems('bangla_vowels')));
router.get('/vowels/:id', (req, res) => {
  const item = getItem('bangla_vowels', req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});
router.post('/vowels', (req, res) => {
  const { character, name, image, description } = req.body;
  if (!character || !name) return res.status(400).json({ error: 'character and name required' });
  res.status(201).json(createItem('bangla_vowels', { character, name, image: image || '', description: description || '' }));
});
router.put('/vowels/:id', (req, res) => {
  const { character, name, image, description } = req.body;
  const updated = updateItem('bangla_vowels', req.params.id, { character, name, image, description });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});
router.delete('/vowels/:id', (req, res) => res.json(deleteItem('bangla_vowels', req.params.id)));

// Consonants
router.get('/consonants', (req, res) => res.json(getItems('bangla_consonants')));
router.get('/consonants/:id', (req, res) => {
  const item = getItem('bangla_consonants', req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});
router.post('/consonants', (req, res) => {
  const { character, name, image, description } = req.body;
  if (!character || !name) return res.status(400).json({ error: 'character and name required' });
  res.status(201).json(createItem('bangla_consonants', { character, name, image: image || '', description: description || '' }));
});
router.put('/consonants/:id', (req, res) => {
  const { character, name, image, description } = req.body;
  const updated = updateItem('bangla_consonants', req.params.id, { character, name, image, description });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});
router.delete('/consonants/:id', (req, res) => res.json(deleteItem('bangla_consonants', req.params.id)));

module.exports = router;
