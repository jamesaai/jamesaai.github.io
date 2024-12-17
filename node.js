const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();

// Your secret key for reCAPTCHA verification
const recaptchaSecretKey = '6Lcyy54qAAAAAHt-jUgk1rdwCAxLyZzgpn4JPbeZ'; 

// Middleware to parse JSON body
app.use(bodyParser.json());

// POST route to verify reCAPTCHA and student ID
app.post('/verify', async (req, res) => {
    const { recaptchaResponse, studentID, twoFACode } = req.body;

    // Step 1: Validate the reCAPTCHA response with Google's API
    const recaptchaValidationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
            secret: recaptchaSecretKey,
            response: recaptchaResponse,
        }),
    });

    const recaptchaValidationData = await recaptchaValidationResponse.json();

    // Step 2: Check if reCAPTCHA was successful
    if (!recaptchaValidationData.success) {
        return res.json({ success: false, message: 'reCAPTCHA validation failed.' });
    }

    // Step 3: Verify the student ID and 2FA code (for demonstration purposes, using hardcoded values)
    if (studentID === "1737" && twoFACode === "1737") {
        // Success! You can proceed to notify Discord or any other action
        return res.json({ success: true, message: 'Verification successful.' });
    } else {
        return res.json({ success: false, message: 'Incorrect student ID or 2FA code.' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
