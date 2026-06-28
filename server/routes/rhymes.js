const express = require('express');
const { getDb, saveDb, nextId } = require('../db');

const router = express.Router();

function getSorted(table) {
  return getDb()[table].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id);
}

function crud(table) {
  return {
    list: (req, res) => res.json(getSorted(table)),
    create: (req, res) => {
      const { title, text, image } = req.body;
      if (!title || !text) return res.status(400).json({ error: 'title and text required' });
      const db = getDb();
      const item = { id: nextId(db), title, text, image: image || '', sort_order: db[table].length };
      db[table].push(item);
      saveDb(db);
      res.status(201).json(item);
    },
    update: (req, res) => {
      const { title, text, image } = req.body;
      const db = getDb();
      const idx = db[table].findIndex(i => i.id === Number(req.params.id));
      if (idx === -1) return res.status(404).json({ error: 'Not found' });
      db[table][idx] = { ...db[table][idx], title, text, image };
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

const bCrud = crud('bangla_rhymes');
router.get('/bangla', bCrud.list);
router.post('/bangla', bCrud.create);
router.put('/bangla/:id', bCrud.update);
router.delete('/bangla/:id', bCrud.delete);

const eCrud = crud('english_rhymes');
router.get('/english', eCrud.list);
router.post('/english', eCrud.create);
router.put('/english/:id', eCrud.update);
router.delete('/english/:id', eCrud.delete);

module.exports = router;
