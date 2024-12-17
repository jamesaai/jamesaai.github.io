const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { recaptchaResponse, studentID, twoFACode } = JSON.parse(event.body);

    // Your reCAPTCHA secret key
    const secretKey = '6Lcyy54qAAAAAHt-jUgk1rdwCAxLyZzgpn4JPbeZ';

    // Step 1: Verify the reCAPTCHA response with Google's API
    const recaptchaValidationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
            secret: secretKey,
            response: recaptchaResponse,
        }),
    });

    const recaptchaValidationData = await recaptchaValidationResponse.json();

    // Step 2: Check if reCAPTCHA was successful
    if (!recaptchaValidationData.success) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'reCAPTCHA validation failed' }),
        };
    }

    // Step 3: Verify the student ID and 2FA code
    if (studentID === "1737" && twoFACode === "1737") {
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Verification successful' }),
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Invalid ID or 2FA code' }),
    };
};
