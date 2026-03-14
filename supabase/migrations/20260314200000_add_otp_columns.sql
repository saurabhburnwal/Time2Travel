-- Migration to add OTP columns for forgot password flow
-- Created: 2026-03-14

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS reset_otp VARCHAR(255),
ADD COLUMN IF NOT EXISTS reset_otp_expiry TIMESTAMP;
