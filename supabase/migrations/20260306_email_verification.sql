-- Migration: Add email verification columns to users table
-- Created: 2026-03-06

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_email_verified  BOOLEAN       NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255),
  ADD COLUMN IF NOT EXISTS token_expires_at   TIMESTAMPTZ;

-- Index for fast token lookups during verification
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users (verification_token)
  WHERE verification_token IS NOT NULL;
