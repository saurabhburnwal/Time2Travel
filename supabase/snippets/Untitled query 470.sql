UPDATE users 
SET is_email_verified = true, 
    verification_token = NULL, 
    token_expires_at = NULL 
WHERE email = 'your-email@example.com';
