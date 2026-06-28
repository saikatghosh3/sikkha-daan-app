const express = require('express');
const cors = require('cors');
const path = require('path');

const banglaRoutes = require('./routes/bangla');
const englishRoutes = require('./routes/english');
const numbersRoutes = require('./routes/numbers');
const rhymesRoutes = require('./routes/rhymes');
const matchgameRoutes = require('./routes/matchgame');
const shapesRoutes = require('./routes/shapes');
const colorsRoutes = require('./routes/colors');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');
const generalKnowledgeRoutes = require('./routes/generalknowledge');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/bangla', banglaRoutes);
app.use('/api/english', englishRoutes);
app.use('/api/numbers', numbersRoutes);
app.use('/api/rhymes', rhymesRoutes);
app.use('/api/matchgame', matchgameRoutes);
app.use('/api/shapes', shapesRoutes);
app.use('/api/colors', colorsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/general-knowledge', generalKnowledgeRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
