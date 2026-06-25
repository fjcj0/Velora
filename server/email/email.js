import { sender } from "../config/email.config.js";
import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
} from "../templates/email.template.js";
import { sendEmail } from "../utils/email.utils.js";
export const sendVerificationEmail = async (email, verificationToken) => {
    await sendEmail({
        from: `"${sender.name}" <${sender.email}>`,
        to: email,
        subject: "Verify your email!!",
        html: VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationToken
        )
    });
};
export const sendWelcomeEmail = async (email, name) => {
    await sendEmail({
        from: `"${sender.name}" <${sender.email}>`,
        to: email,
        subject: `Welcome ${name} to Appointment App!!`,
        html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
    });
};
export const sendPasswordResetEmail = async (
    email,
    resetPasswordCode
) => {
    await sendEmail({
        from: sender.email,
        to: email,
        subject: "Reset password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
            "{resetPasswordCode}",
            resetPasswordCode
        )
    });
};
export const sendResetSuccessEmail = async (email) => {
    await sendEmail({
        from: sender.email,
        to: email,
        subject: "Password changed successfully!!",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
    });
};