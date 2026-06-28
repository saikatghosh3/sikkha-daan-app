const express = require('express');
const { getDb, saveDb } = require('../db');

const router = express.Router();

const DEFAULT_EMAIL = 'admin@sikkhadaan.com';
const DEFAULT_PASSWORD = 'admin123';

function ensureAdmin(db) {
  if (!db.app_settings.admin_email || !db.app_settings.admin_password) {
    db.app_settings.admin_email = DEFAULT_EMAIL;
    db.app_settings.admin_password = DEFAULT_PASSWORD;
    saveDb(db);
  }
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const db = getDb();
  ensureAdmin(db);
  if (email === db.app_settings.admin_email && password === db.app_settings.admin_password) {
    return res.json({ success: true, user: { email } });
  }
  return res.status(401).json({ error: 'Invalid email or password' });
});

module.exports = router;
