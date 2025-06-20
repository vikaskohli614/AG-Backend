const axios = require('axios');

const clientId = process.env.AUTH_CLIENT_ID || ''
const clientSecret = process.env.AUTH_CLIENT_SECRET || ''

const sendOTP = async (phoneNumber) => {
    const apiKey = 'd9625143-5bc1-11ef-8b60-0200cd936042';
    const url = `https://2factor.in/API/V1/${apiKey}/SMS/${phoneNumber}/AUTOGEN2/login_otp`;

    try {
        const response = await axios.get(url);
        if (response.data.Status === 'Success') {
            console.log(`OTP sent successfully to ${phoneNumber}`);
            return response.data.Details;
        } else {
            console.log(`Failed to send OTP: ${response.data.Details}`);
        }
    } catch (error) {
        console.error(`Error sending OTP: ${error}`);
    }
};


const sendOtp = async (phoneNumber, expiry = 120, otpLength = 4, channels = ["SMS"]) => {
    console.log()
    try {
        const response = await axios.post(
            'https://auth.otpless.app/auth/v1/initiate/otp',
            {
                phoneNumber,
                expiry,
                otpLength,
                channels,
                metadata: {
                    key1: "Data1",
                    key2: "Data2"
                }
            },
            {
                headers: {
                    clientId: clientId,
                    clientSecret: clientSecret,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('OTP sent successfully:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error sending OTP:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const verifyOtp = async (requestId, otp) => {
    try {
        const response = await axios.post(
            'https://auth.otpless.app/auth/v1/verify/otp',
            {
                requestId,
                otp
            },
            {
                headers: {
                    clientId: clientId,
                    clientSecret: clientSecret,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('OTP verified successfully:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
        throw error;
    }
};



module.exports = { sendOTP, sendOtp, verifyOtp }
