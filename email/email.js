import { sender, transporter } from "../config/email.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "../templates/email.template.js";
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = email;
    try {
        await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: recipient,
            subject: "Verify your email!!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error.message);
    }
};
export const sendWelcomeEmail = async (email, name) => {
    const recipient = email;
    try {
        await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: recipient,
            subject: `Welcome ${name} to Appointment App!!`,
            html: WELCOME_EMAIL_TEMPLATE.replace('{name}', name),
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error instanceof Error ? error.message : error);
    }
};
export const sendPasswordResetEmail = async (email, resetPasswordCode) => {
    const recipient = email;
    try {
        await transporter.sendMail({
            from: sender.email,
            to: recipient,
            subject: 'Reset password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetPasswordCode}', resetPasswordCode),
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error instanceof Error ? error.message : error);
    }
};
export const sendResetSuccessEmail = async (email) => {
    const recipient = email;
    try {
        await transporter.sendMail({
            from: sender.email,
            to: recipient,
            subject: 'Password changed successfully!!',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log('Password changed successfully');
    } catch (error) {
        console.log(error.message);
    }
};