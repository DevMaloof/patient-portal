// /lib/nodemailer.ts
import nodemailer from 'nodemailer';

// Create transporter (using Gmail SMTP)
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_FROM, // your Gmail address
        pass: process.env.EMAIL_PASS, // Gmail app password
    },
});

// Verify connection
transporter.verify((error) => {
    if (error) {
        console.error('❌ Nodemailer connection error:', error);
    } else {
        console.log('✅ Nodemailer ready to send emails');
    }
});