import express from 'express';
import authRoutes from './auth.js';
import expRoutes from './expenses.js';
import uploadRoutes from './upload.js';

const router = express.Router();

router.get('/health', (req, res) => res.json({ ok: true }));
router.use('/auth', authRoutes);
router.use('/expenses', expRoutes);
router.use('/upload', uploadRoutes);

export default router;
