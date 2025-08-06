import express from 'express';
import Income from '../models/Income.js';
import { body, validationResult } from 'express-validator';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Add new income
router.post(
  '/',
  authenticateToken,
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('description').optional().isString(),
    body('date').optional().isISO8601()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { amount, category, description, date } = req.body;
      const income = new Income({
        userId: req.user.userId,
        amount,
        category,
        description,
        date: date ? new Date(date) : undefined
      });
      await income.save();
      res.status(201).json({ message: 'Income added', income });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// Get all income for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json({ income });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;