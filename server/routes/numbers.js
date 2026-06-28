const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

function getSorted(table) {
  return getDb()[table].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id);
}

function crud(table) {
  return {
    list: (req, res) => res.json(getSorted(table)),
    get: (req, res) => {
      const item = getDb()[table].find(i => i.id === Number(req.params.id));
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    },
    create: (req, res) => {
      const { character, name, image, description } = req.body;
      if (!character || !name) return res.status(400).json({ error: 'character and name required' });
      const db = getDb();
      const item = { id: nextId(db), character, name, image: image || '', description: description || '', sort_order: db[table].length };
      db[table].push(item);
      saveDb(db);
      res.status(201).json(item);
    },
    update: (req, res) => {
      const { character, name, image, description } = req.body;
      const db = getDb();
      const idx = db[table].findIndex(i => i.id === Number(req.params.id));
      if (idx === -1) return res.status(404).json({ error: 'Not found' });
      db[table][idx] = { ...db[table][idx], character, name, image, description };
      saveDb(db);
      res.json(db[table][idx]);
    },
    delete: (req, res) => {
      const db = getDb();
      db[table] = db[table].filter(i => i.id !== Number(req.params.id));
      saveDb(db);
      res.json({ success: true });
    },
  };
}

const banglaCrud = crud('bangla_numbers');
router.get('/bangla', banglaCrud.list);
router.get('/bangla/:id', banglaCrud.get);
router.post('/bangla', banglaCrud.create);
router.put('/bangla/:id', banglaCrud.update);
router.delete('/bangla/:id', banglaCrud.delete);

const englishCrud = crud('english_numbers');
router.get('/english', englishCrud.list);
router.get('/english/:id', englishCrud.get);
router.post('/english', englishCrud.create);
router.put('/english/:id', englishCrud.update);
router.delete('/english/:id', englishCrud.delete);

module.exports = router;
