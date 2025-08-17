import express from 'express';
import Expense from '../models/Expense.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// all require auth
router.use(auth);

router.get('/', async (req, res) => {
  const items = await Expense.find({ user: req.userId }).sort({ date: -1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  const item = await Expense.create({ user: req.userId, title, amount, category, date, notes });
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const updated = await Expense.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const del = await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!del) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
});

export default router;
