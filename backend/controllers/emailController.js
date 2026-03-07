const { sendTripConfirmationEmail } = require('../utils/emailService');

/**
 * POST /api/email/send-trip-pdf
 *
 * Send a trip confirmation email with the PDF itinerary attached.
 * Expects JSON body: { tripData: { destination, state, days, budget, selectedStay, roadmapType }, pdfBase64: string }
 */
exports.sendTripEmail = async (req, res, next) => {
    try {
        const { tripData, pdfBase64 } = req.body;

        if (!pdfBase64) {
            return res.status(400).json({ success: false, message: 'pdfBase64 is required.' });
        }

        if (!tripData) {
            return res.status(400).json({ success: false, message: 'tripData is required.' });
        }

        // req.user is set by the auth middleware (JWT decoded payload)
        const userName = req.user.name || 'Traveler';
        const userEmail = req.user.email;

        if (!userEmail) {
            return res.status(400).json({ success: false, message: 'User email not found in token.' });
        }

        const sent = await sendTripConfirmationEmail(userName, userEmail, tripData, pdfBase64);

        if (sent) {
            res.json({ success: true, message: `Trip confirmation email sent to ${userEmail}` });
        } else {
            res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
        }
    } catch (err) {
        next(err);
    }
};
