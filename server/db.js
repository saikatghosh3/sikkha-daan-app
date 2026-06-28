const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.json');

function getDb() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = {
      bangla_vowels: [],
      bangla_consonants: [],
      english_alphabet: [],
      bangla_numbers: [],
      english_numbers: [],
      bangla_rhymes: [],
      english_rhymes: [],
      match_game_pairs: [],
      shapes: [],
      colors: [],
      app_settings: {},
      _nextId: 1,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function saveDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function nextId(data) {
  const id = data._nextId;
  data._nextId++;
  return id;
}

module.exports = { getDb, saveDb, nextId };
