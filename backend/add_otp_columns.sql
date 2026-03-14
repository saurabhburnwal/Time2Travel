-- Script to add OTP columns for forgot password flow

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS reset_otp VARCHAR(10),
ADD COLUMN IF NOT EXISTS reset_otp_expiry TIMESTAMP;
