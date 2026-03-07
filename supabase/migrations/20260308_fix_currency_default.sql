-- Fix currency default from USD to INR (the app uses Indian Rupees)
ALTER TABLE expenses ALTER COLUMN currency SET DEFAULT 'INR';

-- Update any existing rows that have the old default
UPDATE expenses SET currency = 'INR' WHERE currency = 'USD';
